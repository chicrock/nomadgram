from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q

from . import models, serializers

from nomadgram.notifications import views as notification_views


class Feed(APIView):

    def get(self, request, format=None):

        user = request.user

        following_users = user.following.all()

        image_list = []

        # need to get feed that wrote from followings. so change
        image_list = models.Image.objects.filter(
            Q(creator__in=following_users) | Q(creator=user)).distinct()[:10]

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
        """ Like image
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

            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except ObjectDoesNotExist:
            new_like = models.Like.objects.create(
                creator=request.user,
                image=found_image
            )

            new_like.save()

            notification_views.create_notification(
                user, found_image.creator, 'like', found_image)

            return Response(status=status.HTTP_201_CREATED)


class UnLikeImage(APIView):

    def delete(self, request, image_id, format=None):
        """ Unlike image
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

            return Response(status=status.HTTP_404_NOT_FOUND)


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

            notification_views.create_notification(
                user, found_image.creator, 'comment', found_image, request.data['message'])

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


class Search(APIView):

    def get(self, request, format=None):
        """ Search images with hashtag
        """

        hashtags = request.query_params.get('hashtags', None)

        if hashtags is not None:

            hashtags = hashtags.split(',')

            images = models.Image.objects.filter(
                tags__name__in=hashtags).distinct()

            serializer = serializers.CountImageSerializer(
                images, many=True)

            return Response(status=status.HTTP_200_OK, data=serializer.data)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ModerateComments(APIView):

    def delete(self, request, image_id, comment_id, format=None):
        """ delete comments
        """

        user = request.user

        try:
            comment = models.Comment.objects.get(
                id=comment_id, image__id=image_id, image__creator=user)

            comment.delete()
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)
