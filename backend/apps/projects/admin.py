from django.contrib import admin
from django.utils.html import format_html
from .models import Project, ProjectImage, ProjectCategory, ProjectTechnology


def thumb(image):
    if image:
        return format_html('<img src="{}" style="height:48px;width:80px;object-fit:cover;border-radius:6px" />', image.url)
    return "-"


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 4
    fields = ("image", "image_type", "caption", "order", "preview")
    readonly_fields = ("preview",)

    def preview(self, obj):
        return thumb(obj.image) if obj.pk else "-"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("cover_preview", "title", "category", "is_featured", "is_published", "order")
    list_display_links = ("title",)
    list_editable = ("is_featured", "is_published", "order")
    list_filter = ("category", "is_published", "is_featured")
    search_fields = ("title", "short_description")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("technologies",)
    inlines = [ProjectImageInline]
    fieldsets = (
        ("Basic info", {"fields": ("title", "slug", "short_description", "category", "technologies", "cover_image")}),
        ("Links", {"fields": ("live_url", "github_url", "case_study_url")}),
        ("Case study content", {"fields": ("overview", "objective", "problem", "solution", "key_features", "results")}),
        ("Display", {"fields": ("is_published", "is_featured", "order")}),
    )

    def cover_preview(self, obj):
        return thumb(obj.cover_image)

    cover_preview.short_description = "Cover"


@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("name",)}


@admin.register(ProjectTechnology)
class ProjectTechnologyAdmin(admin.ModelAdmin):
    search_fields = ("name",)
