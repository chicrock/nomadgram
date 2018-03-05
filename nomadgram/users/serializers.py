from rest_framework import serializers
from . import models

from nomadgram.images import serializers as images_serializers


class ListUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = (
            'id',
            'username',
            'profile_image',
            'name',
        )


class UserProfileSerializer(serializers.ModelSerializer):

    images = images_serializers.CountImageSerializer(many=True)

    username = serializers.ReadOnlyField()

    post_count = serializers.ReadOnlyField()
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()

    class Meta:
        model = models.User
        fields = (
            'username',
            'name',
            'bio',
            'website',
            'post_count',
            'followers_count',
            'following_count',
            'images',
        )
