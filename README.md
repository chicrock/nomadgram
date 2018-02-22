# nomadgram

Cloning instagram with python django and react / react native

## git 
> <code>]$ git init </code><br>
> <code>]$ git remote add origin {GITHUB_URL}</code><br>
> <code>]$ git pull origin master</code><br>
> <code>]$ git add .</code><br>
> <code>]$ git commit -m 'Cleanup'</code><br>
> <code>]$ git push origin master</code>

## postgresql
> Download from https://postgresapp.com/ on mac<br>
> <code>]$ sudo dnf install postgres*</code><br>
> <code>]$ sudo systemctl enable postgresql.service</code><br>
> <code>]$ sudo /usr/bin/postgresql-setup --initdb</code>
> <code>]$ sudo systemctl restart postgresql.service</code>

## django
> make virtual environment with pipenv<br>
> <code>]$ pip install pipenv</code>

> --three means make python version 3 environment<br>
> generate Pipfile in this folder. share this file for sharing there developement environment<br>
> <code>]$ pipenv --three</code>

> install django in pipenv<br>
> <code>]$ pipenv install django</code>

> cookiecutter for big products<br>
> <code>]$ pipenv install cookiecutter</code>

> go into the virtual environment buble<br>
> <code>]$ pipenv shell</code>

> run cookiecutter<br>
> <code>]$ cookiecutter https://github.com/pydanny/cookiecutter-django</code>

