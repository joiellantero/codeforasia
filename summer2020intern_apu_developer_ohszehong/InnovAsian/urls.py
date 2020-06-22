from django.urls import path
from InnovAsian import views

urlpatterns = [
    path('', views.innov_homepage, name='innov-homepage')
]
