from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from nomadgram.users import models as user_model

from taggit.managers import TaggableManager
from django.contrib.humanize.templatetags.humanize import naturaltime

# Create your models here.


@python_2_unicode_compatible
class TimeStampedModel(models.Model):

    # add on the first insert
    created_on = models.DateTimeField(auto_now_add=True)
    # add on the always update
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Image(TimeStampedModel):

    """ Image Model """

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()

    """ Add related_name "images" for search users all images.
    It help to get all images which upload user """
    creator = models.ForeignKey(
        user_model.User,
        null=True,
        on_delete=models.CASCADE,
        related_name='images')

    tags = TaggableManager()

    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    @property
    def natural_time(self):
        return naturaltime(self.created_on)

    def __str__(self):
        return '{} - {}'.format(self.location, self.caption)

    class Meta:
        ordering = ['-created_on']


@python_2_unicode_compatible
class Comment(TimeStampedModel):

    """ Comment Model """

    message = models.TextField()
    creator = models.ForeignKey(
        user_model.User,
        null=True,
        on_delete=models.CASCADE)
    image = models.ForeignKey(
        Image, null=True, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return '{}'.format(self.message)


@python_2_unicode_compatible
class Like(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(
        user_model.User,
        null=True,
        on_delete=models.CASCADE)
    image = models.ForeignKey(
        Image, null=True, on_delete=models.CASCADE, related_name='likes')

    def __str__(self):
        return '{} - {}'.format(self.creator.username, self.image.caption)
