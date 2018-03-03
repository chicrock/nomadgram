from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.core.exceptions import ObjectDoesNotExist

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
        can get image_id because set image_id parameter in urls.py
        """

        user = request.user

        try:
            found_image = models.Image.objects.get(id=image_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            pre_existing_like = models.Like.objects.get(
                creator=user, image=found_image
            )
            pre_existing_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except ObjectDoesNotExist:
            new_like = models.Like.objects.create(
                creator=request.user,
                image=found_image
            )

            new_like.save()

            return Response(status=status.HTTP_201_CREATED)


class CommentOnImage(APIView):

    def post(self, request, image_id, format=None):
        """ Comment On a Image
        Get Image id from urls
        """

        user = request.user

        try:
            found_image = models.Image.objects.get(id=image_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # It make message and creator in commentserializer
        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(creator=user, image=found_image)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Comment(APIView):

    def delete(self, request, comment_id, format=None):
        """ Delete Comment
        Get Comment id from urls
        """

        user = request.user

        try:
            comment = models.Comment.objects.get(id=comment_id, creator=user)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
