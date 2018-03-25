from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.core.exceptions import ObjectDoesNotExist

from . import models, serializers

from nomadgram.notifications import views as notification_views

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


class ExploreUsers(APIView):

    def get(self, request, format=None):
        """Explore Latest sign up user
        """

        user = request.user
        followings = user.following.all()

        last_five = models.User.objects.exclude(
            following__in=followings).order_by('-date_joined')[:5]

        serializer = serializers.ListUserSerializer(last_five, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class FollowUser(APIView):

    def post(self, request, user_id, format=None):
        """ Follow User
        """
        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.following.add(user_to_follow)

        user.save()

        notification_views.create_notification(user, user_to_follow, 'follow')

        return Response(status=status.HTTP_200_OK)


class UnFollowUser(APIView):

    def delete(self, request, user_id, format=None):
        """ Unfollow User
        """
        user = request.user

        try:
            unfollowing_user = user.following.get(id=user_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.following.remove(unfollowing_user)

        user.save()

        return Response(status=status.HTTP_200_OK)


class UserProfile(APIView):

    def _get_user(self, username):
        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except ObjectDoesNotExist:
            return None

    def get(self, request, username, format=None):

        found_user = self._get_user(username)

        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(found_user)

        return Response(status=status.HTTP_200_OK, data=serializer.data)

    def put(self, request, username, format=None):
        """ Update user profile
        """

        user = request.user

        found_user = self._get_user(username)

        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        elif found_user.username != user.username:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        else:
            serializer = serializers.UserProfileSerializer(
                found_user, request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserFollowers(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_followers = found_user.followers.all()

        serializer = serializers.ListUserSerializer(
            user_followers, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserFollowing(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_following = found_user.following.all()

        serializer = serializers.ListUserSerializer(
            user_following, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class Search(APIView):

    def get(self, request, format=None):
        """ Search users with username
        """

        username = request.query_params.get('username', None)

        if username is not None:

            users = models.User.objects.filter(username__icontains=username)

            serializer = serializers.ListUserSerializer(users, many=True)

            return Response(status=status.HTTP_200_OK, data=serializer.data)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):

    def put(self, request, username, format=None):

        user = request.user

        if user.username == username:
            current_password = request.data.get('current_password', None)

            if current_password is not None:

                password_match = user.check_password(current_password)

                if password_match:

                    new_password = request.data.get('new_password', None)

                    if new_password is not None:

                        user.set_password(new_password)

                        user.save()

                        return Response(status=status.HTTP_200_OK)

                    else:
                        return Response(status=status.HTTP_400_BAD_REQUEST)

                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
