from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='scheduler-index'),
    path('login/', views.login, name='scheduler-login'),
    path('signup/', views.signup, name='scheduler-signup'),
    path('logout/', views.logout, name='scheduler-logout'),
    path('account/', views.account, name='scheduler-account'),
    path('password/', views.change_password, name='scheduler-change-password'),
]