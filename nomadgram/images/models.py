from django.db import models
from nomadgram.users import models as user_model

# Create your models here.


class TimeStampedModel(models.Model):

    # add on the first insert
    created_on = models.DateTimeField(auto_now_add=True)
    # add on the always update
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Image(TimeStampedModel):

    """ Image Model """

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(
        user_model.User,
        null=True,
        on_delete=models.CASCADE)


class Comment(TimeStampedModel):

    """ Comment Model """

    message = models.TextField()
    creator = models.ForeignKey(
        user_model.User,
        null=True,
        on_delete=models.CASCADE)
    image = models.ForeignKey(Image, null=True, on_delete=models.CASCADE)


class Like(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(
        user_model.User,
        null=True,
        on_delete=models.CASCADE)
    image = models.ForeignKey(Image, null=True, on_delete=models.CASCADE)
