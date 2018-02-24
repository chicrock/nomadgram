# nomadgram

Cloning instagram with python django and react / react native

## dev options on vsc

> add This options in workspace settings in visual studio code for autocomplete

> <code>"python.pythonPath": "/Users/chicrock/.local/share/virtualenvs/nomadgram-V4YGkj-9/bin/python",</code>

## git

> <code>]$ git init </code>

> <code>]$ git remote add origin {GITHUB_URL}</code>

> <code>]$ git pull origin master</code>

> <code>]$ git add .</code>

> <code>]$ git commit -m 'Cleanup'</code>

> <code>]$ git push origin master</code>

## django

> make virtual environment with pipenv

> <code>]$ pip install pipenv</code>

> --three means make python version 3 environment<br>
> generate Pipfile in this folder. share this file for sharing there developement environment

> <code>]$ pipenv --three</code>

> install django in pipenv

> <code>]$ pipenv install django</code>

> cookiecutter for big products

> <code>]$ pipenv install cookiecutter</code>

> go into the virtual environment buble

> <code>]$ pipenv shell</code>

> run cookiecutter

> <code>]$ cookiecutter https://github.com/pydanny/cookiecutter-django</code>

> install requirements to set project

> <code>]$ pipenv install -r requirements/local.txt</code>

> setup database config on /config/settings/base.py (DATABASE CONFIGURATION)

> create images app

> <code>cd nomadgram</code>

> <code>django-admin startapp images</code>

> Change name variables in ImagesConfig class on apps.py to 'nomadgram.images'<br>
> Add 'nomadgram.images.apps.ImagesConfig' to LOCAL_APPS configuration on base.py<br>
> Add urls.py file in images app folder

## django orm

> inherit from models class in django.db<br>
> define class like beyond code

> <code>class Cat(models.Model):</code>

> lookup can using in filter like this <code>.objects.filter(name\_\_startswith="Mr")</code>

> lookup options<br>
>
> > startswith<br>
> > contains<br>
> > istartswith<br>
> > icontains<br>
> > lt<br>
> > gt

> do migration

> <code>python manage.py makemigrations</code>

> <code>python manage.py migrate</code>

> django models : https://docs.djangoproject.com/en/1.11/topics/db/models/

> django models field : https://docs.djangoproject.com/en/1.11/ref/models/fields/

> django admin document : https://docs.djangoproject.com/en/1.11/ref/contrib/admin/

> Meta class internal model class is explains all the possible metadata options<br>
> Meta class is other things not fields<br>
> if you want define classs to abstract just add attribute on Meta class <code>abstract = True</code>

## postgreSQL

> Download from https://postgresapp.com/ on mac

> Download from https://www.pgadmin.org/download/ on linux or windows

> make database

> <code>CREATE DATABASE nomadgram;</code>
