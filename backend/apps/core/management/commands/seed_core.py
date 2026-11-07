from django.core.management.base import BaseCommand
from apps.core.models import Service, Skill

SERVICES = [
    ("Business Website Development", "Store", "Professional websites that present your business clearly and bring in enquiries.", "Mobile-friendly design\nFast loading\nContact and lead forms"),
    ("E-commerce Website Development", "ShoppingCart", "Online stores with product catalogues, carts and order management.", "Easy product management\nSmooth checkout flow\nAdmin dashboard"),
    ("Restaurant and Cafe Websites", "UtensilsCrossed", "Appealing websites and food order management systems for restaurants and cafes.", "Menu you can edit\nOnline order handling\nPhoto-rich layouts"),
    ("Real Estate Websites", "Building2", "Property listing websites that help buyers find and enquire about properties.", "Property listings\nImage galleries\nEnquiry forms"),
    ("Interior Design Websites", "Palette", "Visual portfolio websites that show your design work beautifully.", "Project galleries\nElegant layouts\nClient enquiries"),
    ("Dental and Clinic Websites", "Stethoscope", "Trustworthy websites for clinics with services, doctors and appointment enquiries.", "Service pages\nAppointment requests\nClear contact details"),
    ("Full-Stack Web Applications", "LayoutDashboard", "Custom web apps with a React frontend, Django backend and PostgreSQL database.", "Secure login and roles\nAdmin panel\nScalable structure"),
    ("Backend API Development", "Code", "Clean REST APIs built with Django REST Framework, plus redesign and optimization of existing sites.", "Well-documented endpoints\nValidation and security\nFaster performance"),
]

SKILLS = {
    "frontend": ["HTML5", "CSS3", "JavaScript", "React.js", "Bootstrap 5"],
    "backend": ["Python", "Django", "Django REST Framework"],
    "database": ["PostgreSQL", "MySQL"],
    "tools": ["Git", "GitHub", "VS Code", "Postman"],
}


class Command(BaseCommand):
    help = "Create starter services and skills (no experience or testimonials are invented)"

    def handle(self, *args, **options):
        for i, (title, icon, desc, benefits) in enumerate(SERVICES, 1):
            Service.objects.get_or_create(
                title=title,
                defaults={"icon": icon, "description": desc, "benefits": benefits, "order": i},
            )
        for cat, names in SKILLS.items():
            for i, name in enumerate(names, 1):
                Skill.objects.get_or_create(name=name, category=cat, defaults={"order": i})
        self.stdout.write(self.style.SUCCESS("Seed complete: services and skills created."))
