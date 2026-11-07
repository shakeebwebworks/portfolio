from django.core.management.base import BaseCommand
from apps.projects.models import Project, ProjectCategory, ProjectTechnology

CATEGORIES = ["Real Estate", "E-commerce", "Food & Restaurant", "Interior Design", "Healthcare", "Cafe"]
TECHNOLOGIES = ["HTML5", "CSS3", "JavaScript", "React.js", "Bootstrap 5", "Python", "Django",
                "Django REST Framework", "PostgreSQL", "MySQL", "Git", "GitHub"]
PROJECTS = [
    ("Real Estate Website", "Real Estate"),
    ("E-commerce Website", "E-commerce"),
    ("Food Order Management System", "Food & Restaurant"),
    ("Interior Design Website", "Interior Design"),
    ("Dental Clinic Website", "Healthcare"),
    ("Premium Luxury Cafe Website", "Cafe"),
]


class Command(BaseCommand):
    help = "Create starter categories, technologies and 6 unpublished project drafts"

    def handle(self, *args, **options):
        cats = {}
        for i, name in enumerate(CATEGORIES, 1):
            cats[name], _ = ProjectCategory.objects.get_or_create(name=name, defaults={"order": i})
        for name in TECHNOLOGIES:
            ProjectTechnology.objects.get_or_create(name=name)
        for i, (title, cat) in enumerate(PROJECTS, 1):
            Project.objects.get_or_create(
                title=title,
                defaults={
                    "category": cats[cat],
                    "short_description": "Add a short description in Django Admin.",
                    "order": i,
                    "is_published": False,
                },
            )
        self.stdout.write(self.style.SUCCESS("Seed complete: 6 draft projects created."))
