from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, date

class Schedule(models.Model):
    date = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
