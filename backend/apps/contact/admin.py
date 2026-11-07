from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "project_type", "budget", "is_read", "created_at")
    list_filter = ("is_read", "project_type")
    search_fields = ("full_name", "email", "message")
    readonly_fields = ("full_name", "email", "phone", "project_type", "budget", "message", "ip_address", "created_at")
    actions = ["mark_read"]

    def has_add_permission(self, request):
        return False

    @admin.action(description="Mark selected messages as read")
    def mark_read(self, request, queryset):
        queryset.update(is_read=True)
