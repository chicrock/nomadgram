# Generated by Django 2.0.2 on 2018-03-04 08:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_auto_20180304_1724'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('female', 'Female'), ('male', 'Male'), ('not-specified', 'Not specified')], max_length=80, null=True),
        ),
    ]