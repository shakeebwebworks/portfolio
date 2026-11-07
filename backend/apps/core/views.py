from django.http import Http404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import SiteProfile, Skill, Service, Testimonial, Experience
from .serializers import (
    SiteProfileSerializer, SkillSerializer, ServiceSerializer,
    TestimonialSerializer, ExperienceSerializer,
)


class ProfileView(RetrieveAPIView):
    serializer_class = SiteProfileSerializer

    def get_object(self):
        obj = SiteProfile.objects.first()
        if not obj:
            raise Http404
        return obj


class PublishedList(ListAPIView):
    pagination_class = None
    model = None

    def get_queryset(self):
        return self.model.objects.filter(is_published=True)


class SkillListView(PublishedList):
    model = Skill
    serializer_class = SkillSerializer


class ServiceListView(PublishedList):
    model = Service
    serializer_class = ServiceSerializer


class TestimonialListView(PublishedList):
    model = Testimonial
    serializer_class = TestimonialSerializer


class ExperienceListView(PublishedList):
    model = Experience
    serializer_class = ExperienceSerializer
