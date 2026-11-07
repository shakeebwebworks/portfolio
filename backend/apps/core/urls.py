from django.urls import path
from . import views

urlpatterns = [
    path("profile/", views.ProfileView.as_view()),
    path("skills/", views.SkillListView.as_view()),
    path("services/", views.ServiceListView.as_view()),
    path("testimonials/", views.TestimonialListView.as_view()),
    path("experience/", views.ExperienceListView.as_view()),
]
