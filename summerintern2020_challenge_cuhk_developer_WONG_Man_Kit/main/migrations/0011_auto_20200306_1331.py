# Generated by Django 3.0.4 on 2020-03-06 05:31

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_auto_20200306_1315'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='member',
            name='birth_data',
        ),
        migrations.AddField(
            model_name='member',
            name='birth_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 3, 6, 13, 31, 20, 935354), verbose_name='Birth data'),
        ),
        migrations.AddField(
            model_name='member',
            name='leader_email',
            field=models.EmailField(default=1, max_length=254),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='member',
            name='leader_mobile',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='member',
            name='leader_name',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='member',
            name='team_name',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='form',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2020, 3, 6, 13, 31, 20, 934356), verbose_name='published date'),
        ),
        migrations.AlterField(
            model_name='site',
            name='published',
            field=models.DateTimeField(default=datetime.datetime(2020, 3, 6, 13, 31, 20, 934356), verbose_name='published date'),
        ),
    ]
