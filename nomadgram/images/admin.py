from django.contrib import admin
from . import models

# Register your models here.


@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):

    search_fields = (
        'location',
        'caption',
    )

    list_display_links = (
        'caption',
    )

    list_filter = (
        'location',
        'creator',
    )

    list_display = (
        'file',
        'location',
        'caption',
        'creator',
        'created_on',
        'updated_on',
    )


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):

    list_display = (
        'creator',
        'image',
        'created_on',
        'updated_on',
    )


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):

    list_display = (
        'message',
        'creator',
        'image',
        'created_on',
        'updated_on'
    )
