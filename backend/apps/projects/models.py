from django.db import models
from django.utils.text import slugify
from .validators import validate_image_size


def unique_slug(model, text, pk, fallback):
    base = slugify(text) or fallback
    slug, n = base, 2
    while model.objects.filter(slug=slug).exclude(pk=pk).exists():
        slug = f"{base}-{n}"
        n += 1
    return slug


class ProjectCategory(models.Model):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=90, unique=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Project category"
        verbose_name_plural = "Project categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(ProjectCategory, self.name, self.pk, "category")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class ProjectTechnology(models.Model):
    name = models.CharField(max_length=60, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Project technology"
        verbose_name_plural = "Project technologies"

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=170, unique=True, blank=True)
    short_description = models.CharField(max_length=300)
    category = models.ForeignKey(ProjectCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name="projects")
    technologies = models.ManyToManyField(ProjectTechnology, blank=True, related_name="projects")

    cover_image = models.ImageField(upload_to="projects/covers/", blank=True, null=True, validators=[validate_image_size])

    overview = models.TextField(blank=True)
    objective = models.TextField(blank=True)
    problem = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    key_features = models.TextField(blank=True, help_text="One feature per line")
    results = models.TextField(blank=True, help_text="One TRUE result per line. Example: Responsive on mobile, tablet and desktop")

    live_url = models.URLField(blank=True, help_text="Leave empty if not deployed. The button will be hidden.")
    github_url = models.URLField(blank=True, help_text="Leave empty if no repository. The button will be hidden.")
    case_study_url = models.URLField(blank=True, help_text="Optional. Leave empty to use the built-in case study page.")

    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False, help_text="Tick when the project is ready to show on the website.")
    order = models.PositiveIntegerField(default=0, help_text="Smaller number shows first.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(Project, self.title, self.pk, "project")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    TYPES = [("desktop", "Desktop screenshot"), ("mobile", "Mobile screenshot"), ("gallery", "Other preview")]
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="projects/gallery/", validators=[validate_image_size])
    image_type = models.CharField(max_length=10, choices=TYPES, default="desktop")
    caption = models.CharField(max_length=150, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.project.title} - {self.image_type}"
