from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
# Create your models here.

class Site(models.Model):
    title = models.CharField(max_length = 200)
    content = models.TextField()
    published = models.DateTimeField("published date", default = datetime.now())
    slug = models.CharField(max_length = 200, default = 1)

    def __str__(self):
        return self.title

class Form(models.Model):
    name = models.CharField(max_length = 200, default = 'Write here')
    sdg = models.CharField(max_length = 200,default = 'Write here')
    des = models.TextField(default = 'Write here')
    date =  models.DateTimeField("published date", default = datetime.now())
    place = models.CharField(max_length = 200,default = 'Write here')
    for_whom = models.CharField(max_length = 200, default = 'Write here')
    why = models.TextField(default = 'Write here')
    objective = models.TextField(default = 'Write here')
    Key_result_1 = models.CharField(max_length = 200, default = 'Write here')
    Key_result_2 = models.CharField(max_length = 200, default = 'Write here')
    Key_result_3 = models.CharField(max_length = 200, default = 'Write here')
    Key_result_4 = models.CharField(max_length = 200, default = 'Write here')

    class Meta:
        verbose_name_plural = 'Forms'

    def __str__(self):
        return self.name

class Member(models.Model):
    team_name = models.CharField(max_length = 100)
    leader_name = models.CharField(max_length = 100)
    leader_mobile = models.IntegerField()
    leader_email = models.EmailField()

    name = models.CharField(max_length = 100)
    mobile = models.IntegerField()
    role = models.CharField(max_length = 100)
    birth_date = models.DateTimeField("Birth data", default = datetime.now())
    school = models.CharField("Organisation/School", max_length = 100)
    job =  models.CharField("Job Function/Major", max_length = 100)

    def __str__(self):
        return self.team_name

class Description(models.Model):
    team_name = models.CharField(max_length = 100)
    demographics = models.TextField(default = 'Write here')
    channels = models.TextField(default = 'Write here')
    impact = models.TextField(default = 'Write here')
    activities = models.TextField(default = 'Write here')
    innovative = models.TextField(default = 'Write here')
    challenges = models.TextField(default = 'Write here')

    def __str__(self):
        return self.team_name

class Budget(models.Model):
    team_name = models.CharField(max_length = 100)
    item_1 = models.CharField(max_length = 100)
    cost_1 = models.IntegerField()
    item_2 = models.CharField(max_length = 100)
    cost_2 = models.IntegerField()
    item_3 = models.CharField(max_length = 100)
    cost_3 = models.IntegerField()
    item_4 = models.CharField(max_length = 100)
    cost_4 = models.IntegerField()

    def __str__(self):
            return self.team_name


