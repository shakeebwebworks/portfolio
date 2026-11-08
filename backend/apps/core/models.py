from django.db import models


class SiteProfile(models.Model):
    full_name = models.CharField(max_length=120)
    role = models.CharField(max_length=120, default="Full-Stack Web Developer")
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    whatsapp = models.CharField(max_length=20, blank=True, help_text="Digits only, with country code. Example: 919876543210")
    city = models.CharField(max_length=80, blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    other_social_url = models.URLField(blank=True)
    cv_file = models.FileField(upload_to="cv/", blank=True)
    photo = models.ImageField(upload_to="profile/", blank=True, null=True, help_text="Your profile photo, shown in the About section")
    available = models.BooleanField(default=True)
    availability_text = models.CharField(max_length=120, default="Available for new projects")
    about_text = models.TextField(blank=True)

    class Meta:
        verbose_name = "Personal information"
        verbose_name_plural = "Personal information"

    def save(self, *args, **kwargs):
        self.pk = 1  # only one profile allowed
        super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name


class Skill(models.Model):
    CATEGORIES = [("frontend", "Frontend"), ("backend", "Backend"), ("database", "Database"), ("tools", "Tools")]
    name = models.CharField(max_length=60)
    category = models.CharField(max_length=20, choices=CATEGORIES)
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["category", "order", "name"]

    def __str__(self):
        return self.name


class Service(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    benefits = models.TextField(blank=True, help_text="One benefit per line")
    icon = models.CharField(max_length=40, blank=True, help_text="Lucide icon name, optional")
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    client_role = models.CharField(max_length=120, blank=True)
    feedback = models.TextField()
    project_name = models.CharField(max_length=150, blank=True)
    rating = models.PositiveSmallIntegerField(default=5)
    client_image = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    is_sample = models.BooleanField(default=False, help_text="Tick ONLY for clearly marked sample text. Leave unticked for real client feedback.")
    is_published = models.BooleanField(default=False, help_text="Hidden on the website until you tick this.")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.client_name} ({'sample' if self.is_sample else 'real'})"


class Experience(models.Model):
    KINDS = [
        ("learning", "Learning journey"), ("technical", "Technical development"),
        ("project", "Personal project"), ("certification", "Certification"),
        ("achievement", "Achievement"),
    ]
    kind = models.CharField(max_length=20, choices=KINDS, default="learning")
    title = models.CharField(max_length=150)
    organisation = models.CharField(max_length=150, blank=True)
    period = models.CharField(max_length=60, blank=True, help_text="Example: 2024 or 2023 - 2024")
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "-id"]

    def __str__(self):
        return self.title

