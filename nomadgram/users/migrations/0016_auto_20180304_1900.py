# Generated by Django 2.0.2 on 2018-03-04 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_auto_20180304_1732'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('not-specified', 'Not specified')], max_length=80, null=True),
        ),
    ]
