from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist

from . import models

from nomadgram.users import models as user_models

from taggit_serializer.serializers import (
    TagListSerializerField, TaggitSerializer)


class SmallImageSerializer(serializers.ModelSerializer):

    """ Used for the notifications
    """

    class Meta:
        model = models.Image
        fields = (
            'file',
        )


class CountImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'like_count',
            'comment_count',
        )


class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'username',
            'profile_image',
        )


class CommentSerializer(serializers.ModelSerializer):

    # set creator read_only. cannot set
    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.Comment
        fields = (
            'id',
            'message',
            'creator',
        )


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Like
        fields = (
            'creator',
        )


class ImageSerializer(TaggitSerializer, serializers.ModelSerializer):

    comments = CommentSerializer(many=True)
    # likes = LikeSerializer(many=True)
    creator = FeedUserSerializer()
    tags = TagListSerializerField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = models.Image
        # fields = '__all__'
        fields = (
            'id',
            'file',
            'location',
            'caption',
            'comments',
            'like_count',
            'creator',
            'tags',
            'natural_time',
            'updated_on',
            'is_liked',
            'is_vertical'
        )

    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            try:
                models.Like.objects.get(creator=request.user, image__id=obj.id)
                return True
            except ObjectDoesNotExist:
                return False

        return False


class InputImageSerializer(serializers.ModelSerializer):

    tags = TagListSerializerField()

    class Meta:
        model = models.Image
        fields = (
            'file',
            'location',
            'caption',
            'tags'
        )
