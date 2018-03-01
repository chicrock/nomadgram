from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers


class Feed(APIView):

    def get(self, request, format=None):

        user = request.user

        following_users = user.following.all()

        image_list = []

        # need to get feed that wrote from followings. so change
        image_list = models.Image.objects.filter(
            creator__in=following_users)[:10]

        # for following in following_users:
        # user_images = following.images.all()[:2]

        #    for image in user_images:
        #        image_list.append(image)

        # sorted_list = sorted(
        #    image_list, key=lambda image: image.created_on, reverse=True)

        serializer = serializers.ImageSerializer(image_list, many=True)

        return Response(serializer.data)


class LikeImage(APIView):

    def post(self, request, image_id, format=None):
        """ Like image / Unlike image
        can get image_id because set image_id parameter in urls.py """

        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoseNotExist:
            return Response(status=404)

        new_like = models.Like.objects.create(
            creator=request.user,
            image=found_image
        )

        new_like.save()

        return Response(status=200)
