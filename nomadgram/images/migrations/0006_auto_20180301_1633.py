# Generated by Django 2.0.2 on 2018-03-01 07:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0005_auto_20180301_1620'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='image',
            options={'ordering': ['-created_on']},
        ),
    ]