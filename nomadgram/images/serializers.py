from rest_framework import serializers
from . import models
from nomadgram.users import models as user_models


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
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):

    comments = CommentSerializer(many=True)
    # likes = LikeSerializer(many=True)
    creator = FeedUserSerializer()

    class Meta:
        model = models.Image
        # fields = '__all__'
        fields = (
            'id',
            'created_on',
            'updated_on',
            'location',
            'caption',
            'comments',
            'like_count',
            'creator',
        )
