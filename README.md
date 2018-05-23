# Nomadgram

*   Cloning instagram with python django and react / react native

## dev options on vsc

*   add This options in workspace settings in visual studio code for autocomplete


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

*   make virtual environment with pipenv

<pre><code>]$ pip install pipenv</code></pre>

--three means make python version 3 environment<br>
generate Pipfile in this folder. share this file for sharing there developement environment

<pre><code>]$ pipenv --three</code></pre>

*   install django in pipenv

<pre><code>]$ pipenv install django</code></pre>

*   cookiecutter for big products

<pre><code>]$ pipenv install cookiecutter</code></pre>

*   go into the virtual environment buble

<pre><code>]$ pipenv shell</code></pre>

*   run cookiecutter

<pre>
<code>]$ cookiecutter https://github.com/pydanny/cookiecutter-django</code>
</pre>

*   install requirements to set project

<pre><code>]$ pipenv install -r requirements/local.txt</code></pre>

*   setup database config on /config/settings/base.py (DATABASE CONFIGURATION)
*   create images app

<pre>
<code>cd nomadgram
django-admin startapp images</code>
</pre>

*   Change name variables in ImagesConfig class on apps.py to 'nomadgram.images'<br>
*   Add 'nomadgram.images.apps.ImagesConfig' to LOCAL_APPS configuration on config/settings/base.py<br>
*   Add urls.py file in images app folder<br>
*   Add urls on config/urls.py file

<pre>
<code># install taggit for approach to taggings
]$ pipenv install django-taggit

# After install add 'taggit' in THIRD_PARTY_APPS on config/settings/base.py

]$ python manage.py migrate

# After all add TAGGIT_CASE_INSENSITIVE = True on last line of config/settings/base.py
</code></pre>

```bash
# Create superuser for admin page
]$ python manage.py createsuperuser
```

*   Django default password module help to change password process<br>
    <code>[Django Check Password Docs](https://docs.djangoproject.com/en/1.11/ref/contrib/auth/#django.contrib.auth.models.User.check_password)</code>

*   JWT (Authentication process)
    *   JSON Web Token [(Introduction to JSON Web Tokens)](https://jwt.io/introduction/)
    *   [Installation](http://getblimp.github.io/django-rest-framework-jwt/)
    *   config about authentication is in AUTHENTICATION_BACKENDS variables on /config/settings/base.py
    *   Process
        > 1.  POST /users/login with username and password
        > 2.  Creates a JWT with a secret
        > 3.  Returns the JWT to the Browser
        > 4.  Sends the JWT on the Authorization Header
        > 5.  Check JWT signature.
        > 6.  Get user infomation from the JWT
        > 7.  Sends resposne to the client
    *   It process instead of cookies or sessions

<pre><code>]$ pipenv install djangorestframework-jwt</code></pre>

<pre><code>Get tokens from /api-token-auth/
After, Request others with Header having Authrization: JWT [TOKENS]</code></pre>

*   Add config array below on bottom of config/settings/base.py
    *   See [Django jwt auth](https://github.com/jpadilla/django-jwt-auth)

<pre><code># Setting no jwt token expiration
JWT_AUTH = {
    'JWT_VERIFY_EXPIRATION': False
}</code></pre>

*   [Django Taggit Rest Serializer](https://github.com/glemmaPaul/django-taggit-serializer)

<pre><code>]$ pipenv install django-taggit-serializer</code></pre>

*   [Django Rest Auth on Github](https://github.com/Tivix/django-rest-auth)
*   [Django Rest Auth Documentation(Can find about social auth)](http://django-rest-auth.readthedocs.io/en/latest/)

<pre><code>]$ pipenv install django-rest-auth
]$ python manage.py migrate</code></pre>

*   [Facebook Developers](https://developers.facebook.com/)
*   [Get your access token for testing](https://developers.facebook.com/tools/accesstoken/)
*   [Google login with allauth](http://django-allauth.readthedocs.io/en/latest/providers.html#google)
*   [Google api console](https://console.developers.google.com/apis)
*   [Get google access token for testing](https://developers.google.com/oauthplayground/)

> Add Social application in admin page

## django orm

*   inherit from models class in django.db<br>
*   define class like beyond code

<pre><code>class Cat(models.Model):</code></pre>

*   lookup can using in filter like this <code>.objects.filter(name\_\_startswith="Mr")</code>
*   lookup options<br>

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

*   [django models](https://docs.djangoproject.com/en/1.11/topics/db/models/)
*   [django models field](https://docs.djangoproject.com/en/1.11/ref/models/fields/)
*   [django admin document](https://docs.djangoproject.com/en/1.11/ref/contrib/admin/)

*   Meta class internal model class is explains all the possible metadata options<br>
*   Meta class is other things not fields<br>
*   if you want define classs to abstract just add attribute on Meta class <code>abstract = True</code>

## RESTful API Design concepts

*   REFER: [RESTful API designing guidelines](https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9)

<pre><code>]$ pipenv install djangorestframework
]$ pipenv install markdown
]$ pipenv install django-filter

# After install add 'rest_framework' to THIRD_PARTY_APPS on /config/settings/base.py
</code></pre>

*   Add Context to All serializers for full urls. If not, only return relative urls.

*   <code>[Django rest Framework ApiGuide](http://www.django-rest-framework.org/api-guide/serializers/)</code>

*   <code>[Django rest Framework RequestData](http://www.django-rest-framework.org/api-guide/requests/#data)</code>

*   <code>[Django Middleware](https://docs.djangoproject.com/en/1.11/ref/request-response/#attributes-set-by-middleware)</code>

### Concepts

1.  Focus on NOUNS
    > GET /dogs <br>
    > POST /dogs <br>
    > DELETE /dogs
    > PUT /dogs <br>
2.  CRUD (CREATE, READ, UPDATE, DELETE)
    > GET /dogs/king <br>
    > POST /dogs/king (error)<br>
    > PUT /dogs/king (if king exists update, if not error)<br>
    > DELETE /dogs/king
3.  Variation
    > GET /dogs/search?color=black <br>
    > GET /owners/nicolas/dogs/search?color=black
4.  Version
    > GET /v1/dogs/search?color=black<br>
    > GET /v2/dogs/search?color=black

GET /owners/nicolas/dogs -> List of all the dogs that Nicolas has.<br>
POST /owners/nicolas/dogs -> Create a dog for Nicolas.<br>
PUT /owners/nicolas/dogs -> Update all of Nicolas's dogs.<br>
DELETE /owners/nicolas/dogs -> Delete all of Nicolas's dogs.

### Api Planing

*   [Use Trello](https://trello.com/b/iZEc0d2S)

### Api Test

*   Test with Postman

### Django humanize for data formatting

*   See [Django Humanize Site](https://docs.djangoproject.com/en/1.11/ref/contrib/humanize)

## postgreSQL

*   Download from https://postgresapp.com/ on mac
*   Download from https://www.pgadmin.org/download/ on linux or windows
*   make database

<pre><code>CREATE DATABASE nomadgram;</code></pre>

## Regular Expressions

*   [Test Regular Expressions](https://regex101.com/)
*   [Introduction to Regular Expressions](https://regexone.com/)
*   See [Django URL Dispatcher](https://docs.djangoproject.com/en/2.0/topics/http/urls/) for more about Django urls

## Create Reactjs

*   See [Facebook incubator create-react-app github](https://github.com/facebookincubator/create-react-app)

<pre><code># install create-react-app
]$ yarn global add create-react-app

# create react project
]$ create-react-app frontend
]$ cd frontend
]$ yarn start
</code></pre>

*   create-react-app cannot use sass and css modules. so need to eject !!(means use our webpack.config.js)

<pre><code># eject react
]$ yarn eject</code></pre>

*   After eject need to install modules about sass
*   webpack load loaders bottom to top

> It means load
>
> sass-loader -> postcss-loader -> css-loader -> style-loader
>
> sequentially on development

<pre><code># loader load sass module to webpack
]$ yarn add node-sass sass-loader</code></pre>

*   See [What are CSS Modules and why do we need them?](https://css-tricks.com/css-modules-part-1-need/)

### CSS modules

> It can help to separates like class name.
>
> It change class names like {components_name}**{class_name}**{hash}
>
> example : Nav**list**cs322903, Photo**list**ac293827

> See [webpack-contrib/css-loader](https://github.com/webpack-contrib/css-loader#modules)

### Merge django and reactjs

1.  proxy setting

> *   For request to django server fro reactjs web app(For developmenet)

> *   reactjs request from 3000 to django server on port 8000. But django reject request from 3000.

> *   reactjs can not fetch django url. so proxy setting can do help.

> *   example:

> > <pre><code>fetch('/notifications/')</code></pre>

> > It cannot found on 3000 port. so proxy setting forward this request to 8000 port.

2.  install django-cores-heladers in django project

> *   Need to accept another port request on django server

> <pre><code>pipenv install django-cors-headers</code></pre>

> *   Add 'corsheaders' in THIRD_PARTY_APPS vars on config/settings/base.py in django

> *   Add 'corsheaders.middleware.CorsMiddleware' before 'CommonMiddleware' in MIDDLEWARE vars on config/settings/base.py in django

> *   Add `CORS_ORIGIN_ALLOW_ALL = True` on the bottom of config/settings/base.py in django

3.  Add react web app to django

> *   response reactjs web app when reqeust django web page (not include rest api url)

> *   Add `str(ROOT_DIR.path('frontend', 'build', 'static'))` in STATICFILES_DIRS on config/settings/base.py in django

> *   Create a views.py file on root project directory (ROOT_DIR/nomadgram)

> *   Add `url(r'^', views.ReactAppView.as_view()),` last of the list urlpatterns on config/urls.py

> *   Django can read build files !!

<pre><code># nomadgram/views.py
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
import os


class ReactAppView(View):

    def get(self, request):
        try:
            with open(os.path.join(str(settings.ROOT_DIR), 'frontend', 'build', 'index.html')) as file:
                return HttpResponse(file.read())

        except:
            return HttpResponse(
                """ index.html not found ! build your React app !!
                """,

                status=501,
            )
</code></pre>

### Redux

<pre><code># Install redux
]$ yarn add redux react-redux</code></pre>

*   Django middlewares are between request and server.
*   Redux middlewares are between react app and store(send actions to our redux store)
    *   See [Redux thunk](https://github.com/gaearon/redux-thunk)

<pre><code>]$ yarn add redux-thunk</code></pre>

<pre><code># Install redux-logger in devDependencies
]$ yarn add redux-logger --dev</code></pre>

<pre><code># Install react-router-dom
]$ yarn add react-router-dom react-router-redux@next history </code></pre>

### DEV tools

### Reactotron (dev environment)

*   App for Inspecting ReactJS and React Native apps
*   See [Reactotron](https://github.com/infinitered/reactotron)
*   Download from [Reactotron Download](https://github.com/infinitered/reactotron/blob/master/docs/installing.md)

<pre><code># Install Reactotron
]$ npm install -g reactotron-cli

# Add to project
]$ yarn add reactotron-react-js --dev

# Install reactotron-redux for redux
]$ yarn add reactotron-redux --dev
</code></pre>

*   Make ReactotronConfig.js file on src

<pre><code># Add redux devtools extension for chrome extension
]$ yarn add redux-devtools-extension --dev</code></pre>

### Language and style setup

<pre><code># Add i18n for multi language
]$ yarn add redux-i18n</code></pre>

<pre><code># Add reset-css modules for reset all browsers default styles
]$ yarn add reset-css</code></pre>

*   I can get the font from google fonts.[Google fonts](https://fonts.google.com)

### React design patterns

*   See [React Component Patterns](https://levelup.gitconnected.com/react-component-patterns-ab1f09be2c82)
*   Container + Presenter patterns

> Container : Logic(API Request, errors, etc...)
>
> Presenter : No Logic, Only UI

### Development View

<pre><code># Add react ionicons
]$ yarn add react-ionicons</code></pre>

*   Create Translation files

<pre><code># For create translation files Add belows to scripts variables in package.json files
    "extract": "i18n_extract",
    "import": "i18n_import --encoding=utf-8"
# And Use yarn extract to create .pot file
# Create ko.po in locales and put the content from .pot files and translate.
# Include belows in the header of ko.po file.

    msgid ""
    msgstr ""
    "Language: ko"

]$ yarn run import
</code></pre>

### Social login

*   [React Facebook Login](https://www.npmjs.com/package/react-google-login)
*   [React Google Login](https://www.npmjs.com/package/react-google-login)

<pre><code># Add react-facebook-login
]$ yarn add react-facebook-login </code></pre>

*   [Get Fontawesome icons for Facebook Login](https://fontawesome.com/icons)
*   Add APP URL to 'localhost' in basic settings on facebook development page

### Login with username

*   See [Tivix django-rest-auth](https://github.com/Tivix/django-rest-auth)
*   [django-rest-auth Document](http://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html)

### Block update bug

*   Block update : Component didn't rendering again.
*   Add location to props for re-rendering

### textarea autosizing

```bash
]$ yarn add react-textarea-autosize
```

### optimistic update

*   It's all for UX

1.  update user interface first.
2.  update data for api.
3.  If there were error on api update, then rollback user interface.

### componentDidUpdate

*   When using componentDidUpdate, must watch out the infinite loop
*   Must check prev props and this props

```javascript
componentDidUpdate = (prevProps, prevState) => {
    const { searchByTerm } = this.props;
    if (prevProps.match.params !== this.props.match.params) {
        searchByTerm();
    }
};
```

### Get User profile on login

* See [django rest auth](http://django-rest-auth.readthedocs.io/en/latest/configuration.html)

```python
# config/settings/base.py
REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'nomadgram.users.serializers.UserProfileSerializer'
}
```
