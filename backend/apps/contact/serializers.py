import re
from rest_framework import serializers
from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["full_name", "email", "phone", "project_type", "budget", "message"]

    def validate_full_name(self, v):
        v = " ".join(v.split())
        if len(v) < 2:
            raise serializers.ValidationError("Please enter your full name.")
        return v

    def validate_phone(self, v):
        if v and not re.fullmatch(r"[0-9+\-\s()]{7,18}", v):
            raise serializers.ValidationError("Please enter a valid phone number.")
        return v

    def validate_message(self, v):
        v = v.strip()
        if len(v) < 10:
            raise serializers.ValidationError("Please describe your project (at least 10 characters).")
        return v
