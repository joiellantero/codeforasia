"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.homepage, name = 'homepage'),
    path('register.html/', views.register, name = 'register'),
    path('logout.html/', views.logout_request, name = 'logout'),
    path('login.html/', views.login_request, name = 'login'),
    path('account.html/', views.save_form, name = 'account'),
    path('account.html/team.html/', views.save_team_form, name = 'team'),
    path('account.html/team.html/description.html', views.save_des_form, name = 'des'),
    path('account.html/team.html/budget.html', views.save_budget_form, name = 'budget'),
    #url(r'^login.html/', views.login_request, name = 'login'),



]
