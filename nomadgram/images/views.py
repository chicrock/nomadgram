from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers


class Feed(APIView):

    def get(self, request, format=None):

        user = request.user

        following_users = user.following.all()

        image_list = []

        for following in following_users:
            user_images = following.images.all()[:2]

            for image in user_images:
                image_list.append(image)

        sorted_list = sorted(
            image_list, key=lambda image: image.created_on, reverse=True)

        serializer = serializers.ImageSerializer(sorted_list, many=True)

        return Response(serializer.data)


class LikeImage(APIView):

    def post(self, request, image_id, format=None):
        """ Like image / Unlike image
        can get image_id because set image_id parameter in urls.py """

        print(image_id)

        return Response(status=200)
