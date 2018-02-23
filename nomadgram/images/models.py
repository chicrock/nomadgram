from django.db import models

# Create your models here.


class Cat(models.Model):
    name = models.CharField(max_length=30)
    breed = models.CharField(max_length=20)
    grumpy = models.BooleanField(default=False)

# Cat.objects.create(name="Fluffy", breed="Persian")
# Cat.objects.get(id=1)
# Cat.objects.filter(name__startswith="Mr")
# cats = Cat.objects.all()

# fluffy = Cat.objects.get(id=1)
# fluffy.name = 'flyffy'
# fluffy.save()
# fluffy.delete()
