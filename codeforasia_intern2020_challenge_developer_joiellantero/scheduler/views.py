from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseRedirect
from django.core import serializers
from django.contrib.auth.models import User
from .models import (
    Schedule,
)
from .forms import (
    AuthenticationForm, 
    SignupForm, 
    EditAccountForm, 
    PasswordChangeForm,
    SchedulerForm,
)
from django.contrib.auth import (
    authenticate, 
    login as auth_login, 
    logout as auth_logout,
    update_session_auth_hash
)

@login_required
def index(request):
    admin = User.objects.get(username='admin')
    admin_email = admin.email
    form = SchedulerForm()
    if request.method == 'POST':
        form = SchedulerForm(request.POST)
        if form.is_valid():
            first_name = request.user.first_name
            last_name = request.user.last_name
            email = request.user.email
            date = form.cleaned_data['date']
            phone_number = form.cleaned_data['phone_number']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']

            line = '-'*20

            final_msg = f"SENDER INFO\n{line}\nName: {first_name} {last_name}\nEmail: {email}\nPhone: {phone_number}\n\nSCHEDULE\n{line}\n{date}\n\nSUBJECT\n{line}\n{subject}\n\nMESSAGE\n{line}\n{message}\n"

            try:
                send_mail(
                    subject, 
                    final_msg, 
                    email,
                    [email, admin_email],
                    fail_silently=False,
                )
                messages.success(request, "Success! Message sent.", extra_tags='is-success')
            except BadHeaderError:
                messages.error(request, "Oh snap! Message failed to send.", extra_tags='is-danger')
                return HttpResponse('Invalid header found.')
            return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
        
        else:
            messages.error(request, "Oh snap! Message failed to send.", extra_tags='is-danger')
    
    json_serializer = serializers.get_serializer("json")()
    schedule = json_serializer.serialize(Schedule.objects.all().order_by('id')[:], ensure_ascii=False)
    
    context = {
        'title': 'Appointment Scheduler',
        'form': form,
        'schedule': schedule
    }
    return render(request, 'scheduler/index.html', context)

def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            User = authenticate(
                username=username,
                password=password
            )
            auth_login(request, User)
            return redirect('scheduler-index')
    else:
        form = SignupForm()
    context = {
        'title': 'Sign up',
        'form': form
    }
    return render(request, 'scheduler/signup.html', context)

def login(request):
    if request.user.is_authenticated:
        return redirect('scheduler-index')
    if request.method == "POST":
        form = AuthenticationForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            if not request.POST.get('remember_me', None):
                    request.session.set_expiry(0)
            User = authenticate(
                username=username,
                password=password
            )
            if User:
                auth_login(request, User)
                return redirect('scheduler-index')
    else:
        form = AuthenticationForm()
    context = {
        'title': 'Login',
        'form': form
    }
    return render(request, 'scheduler/login.html', context)

@login_required
def logout(request):
    auth_logout(request)
    return redirect('scheduler-index')

@login_required
def account(request):
    if request.method == 'POST':
        form = EditAccountForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account information updated!', extra_tags='is-success')
            return redirect('scheduler-account')
        else:
            messages.error(request, 'Account failed to update!', extra_tags='is-danger')
            return redirect('scheduler-account')
    else: 
        form = EditAccountForm(instance=request.user)
    context = {
        'title': 'Account',
        'form': form
    }
    return render(request, 'scheduler/account.html', context)

@login_required
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(data=request.POST, user=request.user)
        if form.is_valid():
                form.save()
                update_session_auth_hash(request, form.user)
                messages.success(request, 'Account password updated!', extra_tags='is-success')
                return redirect('scheduler-change-password')
        else:
            messages.error(request, "Please check the password you entered", extra_tags='is-danger')
            return redirect('scheduler-change-password')
    else: 
        form = PasswordChangeForm(user=request.user)
    context = {
        'title': 'Update Password',
        'form': form
    }
    return render(request, 'scheduler/account.html', context)
