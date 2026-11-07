from rest_framework import serializers
from apps.core.utils import lines
from .models import Project, ProjectImage, ProjectCategory, ProjectTechnology


class CategorySerializer(serializers.ModelSerializer):
    project_count = serializers.IntegerField(read_only=True, required=False)

    class Meta:
        model = ProjectCategory
        fields = ["id", "name", "slug", "project_count"]


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTechnology
        fields = ["id", "name"]


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ["id", "image", "image_type", "caption", "order"]


class ProjectListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "short_description", "category", "technologies",
            "cover_image", "live_url", "github_url", "case_study_url", "is_featured", "order",
        ]


class ProjectDetailSerializer(ProjectListSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    key_features = serializers.SerializerMethodField()
    results = serializers.SerializerMethodField()
    previous_project = serializers.SerializerMethodField()
    next_project = serializers.SerializerMethodField()

    class Meta(ProjectListSerializer.Meta):
        fields = ProjectListSerializer.Meta.fields + [
            "overview", "objective", "problem", "solution", "key_features", "results",
            "images", "previous_project", "next_project",
        ]

    def get_key_features(self, obj):
        return lines(obj.key_features)

    def get_results(self, obj):
        return lines(obj.results)

    def _neighbor(self, obj, step):
        items = list(Project.objects.filter(is_published=True).values("slug", "title"))
        if len(items) < 2:
            return None
        idx = next((i for i, p in enumerate(items) if p["slug"] == obj.slug), None)
        if idx is None:
            return None
        return items[(idx + step) % len(items)]

    def get_previous_project(self, obj):
        return self._neighbor(obj, -1)

    def get_next_project(self, obj):
        return self._neighbor(obj, 1)
