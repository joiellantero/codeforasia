from django.contrib import admin
from .models import Schedule

class SchedulAdmin (admin.ModelAdmin):
    list_display = ('date', 'start_time', 'end_time')

admin.site.register(Schedule, SchedulAdmin)
