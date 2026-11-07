from rest_framework import serializers
from .models import SiteProfile, Skill, Service, Testimonial, Experience
from .utils import lines


class SiteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteProfile
        exclude = ["id"]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "category", "order"]


class ServiceSerializer(serializers.ModelSerializer):
    benefits = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ["id", "title", "description", "benefits", "icon", "order"]

    def get_benefits(self, obj):
        return lines(obj.benefits)


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ["id", "client_name", "client_role", "feedback", "project_name", "rating", "client_image", "is_sample"]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["id", "kind", "title", "organisation", "period", "description"]
