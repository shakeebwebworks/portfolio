import logging
from django.conf import settings
from django.core.mail import EmailMessage
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)


class ContactThrottle(AnonRateThrottle):
    scope = "contact"


def client_ip(request):
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


class ContactCreateView(CreateAPIView):
    serializer_class = ContactMessageSerializer
    throttle_classes = [ContactThrottle]

    def create(self, request, *args, **kwargs):
        # Honeypot: bots fill this hidden field, real visitors never see it.
        if request.data.get("website"):
            return Response({"detail": "Thank you."}, status=201)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        msg = serializer.save(ip_address=client_ip(request))

        subject = f"New portfolio enquiry from {msg.full_name}".replace("\n", " ").replace("\r", " ")
        body = (
            f"Name: {msg.full_name}\n"
            f"Email: {msg.email}\n"
            f"Phone: {msg.phone or '-'}\n"
            f"Project type: {msg.project_type}\n"
            f"Budget: {msg.budget or '-'}\n\n"
            f"Message:\n{msg.message}\n"
        )
        try:
            EmailMessage(
                subject, body, settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_RECEIVER_EMAIL], reply_to=[msg.email],
            ).send(fail_silently=False)
        except Exception:
            logger.exception("Contact email could not be sent")  # message is still saved in the database

        return Response({"detail": "Thank you. Your message was sent."}, status=201)
