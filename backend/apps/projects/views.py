from django.db.models import Count, Q
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Project, ProjectCategory
from .serializers import ProjectListSerializer, ProjectDetailSerializer, CategorySerializer


def published_projects():
    return (
        Project.objects.filter(is_published=True)
        .select_related("category")
        .prefetch_related("technologies", "images")
    )


class ProjectListView(ListAPIView):
    serializer_class = ProjectListSerializer
    pagination_class = None

    def get_queryset(self):
        qs = published_projects()
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category__slug=category)
        if self.request.query_params.get("featured") == "true":
            qs = qs.filter(is_featured=True)
        return qs


class ProjectDetailView(RetrieveAPIView):
    serializer_class = ProjectDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return published_projects()


class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer
    pagination_class = None

    def get_queryset(self):
        return (
            ProjectCategory.objects
            .annotate(project_count=Count("projects", filter=Q(projects__is_published=True)))
            .filter(project_count__gt=0)
        )
