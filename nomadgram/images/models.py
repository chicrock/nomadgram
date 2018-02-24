from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from nomadgram.users import models as user_model

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
    creator = models.ForeignKey(
        user_model.User,
        null=True,
        on_delete=models.CASCADE)

    def __str__(self):
        return '{} - {}'.format(self.location, self.caption)


@python_2_unicode_compatible
class Comment(TimeStampedModel):

    """ Comment Model """

    message = models.TextField()
    creator = models.ForeignKey(
        user_model.User,
        null=True,
        on_delete=models.CASCADE)
    image = models.ForeignKey(Image, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.message)


@python_2_unicode_compatible
class Like(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(
        user_model.User,
        null=True,
        on_delete=models.CASCADE)
    image = models.ForeignKey(Image, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return 'User: {} - Image Caption: {}'.format(self.creator.username, self.image.caption)
