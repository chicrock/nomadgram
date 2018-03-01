# nomadgram

Cloning instagram with python django and react / react native

## dev options on vsc

add This options in workspace settings in visual studio code for autocomplete

<pre>
<code>"python.pythonPath": "/Users/chicrock/.local/share/virtualenvs/nomadgram-V4YGkj-9/bin/python",</code>
</pre>

## git

<pre>
<code>]$ git init 
]$ git remote add origin {GITHUB_URL}
]$ git pull origin master
]$ git add .
]$ git commit -m 'Cleanup'
]$ git push origin master</code>
</pre>

## django

make virtual environment with pipenv

<pre><code>]$ pip install pipenv</code></pre>

--three means make python version 3 environment<br>
generate Pipfile in this folder. share this file for sharing there developement environment

<pre><code>]$ pipenv --three</code></pre>

install django in pipenv

<pre><code>]$ pipenv install django</code></pre>

cookiecutter for big products

<pre><code>]$ pipenv install cookiecutter</code></pre>

go into the virtual environment buble

<pre><code>]$ pipenv shell</code></pre>

run cookiecutter

<pre>
<code>]$ cookiecutter https://github.com/pydanny/cookiecutter-django</code>
</pre>

install requirements to set project

<pre><code>]$ pipenv install -r requirements/local.txt</code></pre>

setup database config on /config/settings/base.py (DATABASE CONFIGURATION)

create images app

<pre>
<code>cd nomadgram
django-admin startapp images</code>
</pre>

Change name variables in ImagesConfig class on apps.py to 'nomadgram.images'<br>
Add 'nomadgram.images.apps.ImagesConfig' to LOCAL_APPS configuration on base.py<br>
Add urls.py file in images app folder

## django orm

inherit from models class in django.db<br>
define class like beyond code

<pre><code>class Cat(models.Model):</code></pre>

lookup can using in filter like this <code>.objects.filter(name\_\_startswith="Mr")</code>

lookup options<br>

> startswith<br>
> contains<br>
> istartswith<br>
> icontains<br>
> lt<br>
> gt

do migration

<pre>
<code>]$ python manage.py makemigrations
]$ python manage.py migrate</code>
</pre>

django models : https://docs.djangoproject.com/en/1.11/topics/db/models/

django models field : https://docs.djangoproject.com/en/1.11/ref/models/fields/

django admin document : https://docs.djangoproject.com/en/1.11/ref/contrib/admin/

Meta class internal model class is explains all the possible metadata options<br>
Meta class is other things not fields<br>
if you want define classs to abstract just add attribute on Meta class <code>abstract = True</code>

## RESTful API Design concepts

REFER: [RESTful API designing guidelines](https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9)

<pre><code>]$ pipenv install djangorestframework
]$ pipenv install markdown
]$ pipenv install django-filter

# After install add 'rest_framework' to THIRD_PARTY_APPS on /config/settings/base.py
</code></pre>

<code>See [Django rest Framework ApiGuide](http://www.django-rest-framework.org/api-guide/serializers/)</code>

<code>See [Django Middleware](https://docs.djangoproject.com/en/1.11/ref/request-response/#attributes-set-by-middleware)</code>

### Concepts

> 1. Focus on NOUNS
>     > GET /dogs <br>
>     > POST /dogs <br>
>     > DELETE /dogs
>     > PUT /dogs <br>
> 2. CRUD (CREATE, READ, UPDATE, DELETE)
>     > GET /dogs/king <br>
>     > POST /dogs/king (error)<br>
>     > PUT /dogs/king (if king exists update, if not error)<br>
>     > DELETE /dogs/king
> 3. Variation
>     > GET /dogs/search?color=black <br>
>     > GET /owners/nicolas/dogs/search?color=black
> 4. Version
>     > GET /v1/dogs/search?color=black<br>
>     > GET /v2/dogs/search?color=black
>
> GET /owners/nicolas/dogs -> List of all the dogs that Nicolas has.<br>
> POST /owners/nicolas/dogs -> Create a dog for Nicolas.<br>
> PUT /owners/nicolas/dogs -> Update all of Nicolas's dogs.<br>
> DELETE /owners/nicolas/dogs -> Delete all of Nicolas's dogs.

### Api Planing

[Use Trello](https://trello.com/b/iZEc0d2S)

## postgreSQL

Download from https://postgresapp.com/ on mac

Download from https://www.pgadmin.org/download/ on linux or windows

make database

<pre><code>CREATE DATABASE nomadgram;</code></pre>

## Regular Expressions

[Test Regular Expressions](https://regex101.com/)

[Introduction to Regular Expressions](https://regexone.com/)

See [Django URL Dispatcher](https://docs.djangoproject.com/en/2.0/topics/http/urls/) for more about Django urls
