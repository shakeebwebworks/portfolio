from django.contrib import admin
from .models import SiteProfile, Skill, Service, Testimonial, Experience

admin.site.site_header = "Portfolio Admin"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Manage your portfolio"


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not SiteProfile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "order", "is_published")
    list_editable = ("order", "is_published")
    list_filter = ("category",)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "is_published")
    list_editable = ("order", "is_published")


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("client_name", "project_name", "rating", "is_sample", "is_published", "order")
    list_editable = ("is_published", "order")
    list_filter = ("is_sample", "is_published")


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "kind", "period", "order", "is_published")
    list_editable = ("order", "is_published")
    list_filter = ("kind",)
