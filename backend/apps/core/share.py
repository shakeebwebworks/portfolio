from django.conf import settings
from django.http import Http404, HttpResponse
from django.utils.html import escape
from apps.projects.models import Project


def project_share(request, slug):
    """Link for WhatsApp / LinkedIn: shows a preview card to bots, then sends people to the real page."""
    try:
        p = Project.objects.select_related("category").get(slug=slug, is_published=True)
    except Project.DoesNotExist:
        raise Http404

    target = f"{settings.FRONTEND_URL.rstrip('/')}/projects/{p.slug}"
    image = p.cover_image.url if p.cover_image else ""
    if image.startswith("/"):
        image = request.build_absolute_uri(image)

    title = escape(f"{p.title} | Case Study")
    desc = escape(p.short_description)
    url = escape(target)
    img_tags = ""
    if image:
        img = escape(image)
        img_tags = (
            f'<meta property="og:image" content="{img}">'
            '<meta name="twitter:card" content="summary_large_image">'
            f'<meta name="twitter:image" content="{img}">'
        )

    html = (
        '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        f"<title>{title}</title>"
        f'<meta name="description" content="{desc}">'
        '<meta property="og:type" content="website">'
        f'<meta property="og:title" content="{title}">'
        f'<meta property="og:description" content="{desc}">'
        f'<meta property="og:url" content="{url}">'
        f"{img_tags}"
        f'<link rel="canonical" href="{url}">'
        f'<meta http-equiv="refresh" content="0;url={url}">'
        f'</head><body><a href="{url}">Open the project</a></body></html>'
    )
    return HttpResponse(html)
