from django.core.exceptions import ValidationError


def validate_image_size(f):
    if f.size > 5 * 1024 * 1024:
        raise ValidationError("Image must be smaller than 5 MB.")
