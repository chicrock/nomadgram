from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.core.exceptions import ObjectDoesNotExist

from . import models, serializers

# Create your views here.


class Notifications(APIView):

    def get(self, request, format=None):

        user = request.user

        notifications = models.Notification.objects.filter(to=user)

        serializer = serializers.NotificationSerializer(
            notifications, many=True)

        return Response(status=status.HTTP_200_OK, data=serializer.data)


def create_notification(creator, to, notification_type, image=None, comment=None):
    """ Create Notifications
    """

    notification = models.Notification.objects.create(
        creator=creator,
        to=to,
        notification_type=notification_type,
        image=image,
        comment=comment,
    )

    notification.save()
