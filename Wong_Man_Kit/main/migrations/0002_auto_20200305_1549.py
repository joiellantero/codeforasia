# Generated by Django 3.0.4 on 2020-03-05 07:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='site',
            name='published',
            field=models.DateTimeField(default=datetime.datetime(2020, 3, 5, 15, 49, 43, 630210), verbose_name='published date'),
        ),
    ]
