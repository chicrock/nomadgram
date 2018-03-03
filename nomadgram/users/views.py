from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.core.exceptions import ObjectDoesNotExist

from . import models, serializers


class ExploreUsers(APIView):

    def get(self, request, format=None):
        """Explore Latest sign up user
        """

        user = request.user
        followings = user.following.all()

        last_five = models.User.objects.exclude(
            id__in=[following.id for following in followings]).order_by('-date_joined')[:5]

        serializer = serializers.ExploreUserSerializer(last_five, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
