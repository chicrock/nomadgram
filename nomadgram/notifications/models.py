from django.db import models
from django.utils.encoding import python_2_unicode_compatible

from nomadgram.users import models as user_models
from nomadgram.images import models as image_models

# Create your models here.


@python_2_unicode_compatible
class Notification(image_models.TimeStampedModel):

    """ Notification model
    """

    TYPE_CHOICES = (
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('follow', 'Follow'),
    )

    creator = models.ForeignKey(
        user_models.User, on_delete=models.CASCADE, related_name='creator')
    to = models.ForeignKey(
        user_models.User, on_delete=models.CASCADE, related_name='to')
    notification_type = models.CharField(
        max_length=20, choices=TYPE_CHOICES)
    image = models.ForeignKey(
        image_models.Image, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return 'From: {} To: {}'.format(self.creator, self.to)

    class Meta:
        ordering = ['-created_on']
