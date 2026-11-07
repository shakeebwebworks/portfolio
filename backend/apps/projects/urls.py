from django.urls import path
from . import views

urlpatterns = [
    path("projects/", views.ProjectListView.as_view()),
    path("projects/<slug:slug>/", views.ProjectDetailView.as_view()),
    path("categories/", views.CategoryListView.as_view()),
]
