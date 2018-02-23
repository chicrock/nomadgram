# nomadgram

Cloning instagram with python django and react / react native

## git

> <code>]$ git init </code><br> > <code>]$ git remote add origin {GITHUB_URL}</code><br> > <code>]$ git pull origin master</code><br> > <code>]$ git add .</code><br> > <code>]$ git commit -m 'Cleanup'</code><br> > <code>]$ git push origin master</code>

## postgresql (pgadmin or postgresapp)

> Download from https://postgresapp.com/ on mac<br>
> Download from https://www.pgadmin.org/download/ on linux or windows

## django

> make virtual environment with pipenv<br> > <code>]$ pip install pipenv</code>

> --three means make python version 3 environment<br>
> generate Pipfile in this folder. share this file for sharing there developement environment<br> > <code>]$ pipenv --three</code>

> install django in pipenv<br> > <code>]$ pipenv install django</code>

> cookiecutter for big products<br> > <code>]$ pipenv install cookiecutter</code>

> go into the virtual environment buble<br> > <code>]$ pipenv shell</code>

> run cookiecutter<br> > <code>]$ cookiecutter https://github.com/pydanny/cookiecutter-django</code>

> install requirements to set project <br> > <code>]$ pipenv install -r requirements/local.txt</code>

> setup database config on /config/settings/base.py (DATABASE CONFIGURATION)<br>

> create images app<br> > <code>cd nomadgram</code><br> > <code>django-admin startapp images</code><br>
> Change name variables in ImagesConfig class on apps.py to 'nomadgram.images'<br>
> Add 'nomadgram.images.apps.ImagesConfig' to LOCAL_APPS configuration on base.py<br>
> Add urls.py file in images app folder

## django orm

> inherit from models class in django.db<br>
> define class like beyond code<br> > <code>class Cat(models.Model):</code>

> lookup can using in filter like this <code>.objects.filter(name\_\_startswith="Mr")</code><br>
> lookup options<br>
>
> > startswith<br>
> > contains<br>
> > istartswith<br>
> > icontains<br>
> > lt<br>
> > gt

## postgreSQL

> install requirements to set project <br>
> <code>]$ pipenv install -r requirements/local.txt</code>

> setup database config on /config/settings/base.py (DATABASE CONFIGURATION)<br>

> create images app<br>
> <code>cd nomadgram</code><br>
> <code>django-admin startapp images</code><br>
> Change name variables in ImagesConfig class on apps.py to 'nomadgram.images'<br>
> Add 'nomadgram.images.apps.ImagesConfig' to LOCAL_APPS configuration on base.py<br>
> Add urls.py file in images app folder

## django orm
> inherit from models class in django.db<br>
> define class like beyond code<br>
> <code>class Cat(models.Model):</code>

> lookup can using in filter like this <code>.objects.filter(name__startswith="Mr")</code><br>
> lookup options<br>
>> startswith<br>
>> contains<br>
>> istartswith<br>
>> icontains<br>
>> lt<br>
>> gt

> do migration<br>
> <code>python manage.py makemigrations</code><br>
> <code>python manage.py migrate</code>

## postgreSQL
> make database<br>
> <code>CREATE DATABASE nomadgram;</code>
