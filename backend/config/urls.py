from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.urls import include, path
from apps.core.seo import sitemap
from apps.core.share import project_share


def health(request):
    return JsonResponse({"status": "ok", "message": "Portfolio API is running"})


urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path("api/health/", health),
    path("sitemap.xml", sitemap),
    path("share/<slug:slug>/", project_share),
    path("api/", include("apps.core.urls")),
    path("api/", include("apps.projects.urls")),
    path("api/", include("apps.contact.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
