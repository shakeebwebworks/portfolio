from django.conf import settings
from django.http import HttpResponse
from apps.projects.models import Project


def sitemap(request):
    base = settings.FRONTEND_URL.rstrip("/")
    slugs = Project.objects.filter(is_published=True).values_list("slug", flat=True)
    urls = [f"{base}/"] + [f"{base}/projects/{s}" for s in slugs]
    body = "".join(f"  <url><loc>{u}</loc></url>\n" for u in urls)
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{body}</urlset>\n"
    )
    return HttpResponse(xml, content_type="application/xml")
