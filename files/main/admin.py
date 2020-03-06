from django.contrib import admin
from .models import Site, Form, Member, Description, Budget
# Register your models here.

class Admin(admin.ModelAdmin):
    fields = ['title', 'published', 'content']
admin.site.register(Member)
admin.site.register(Form)
admin.site.register(Description)
admin.site.register(Budget)
admin.site.register(Site, Admin)
