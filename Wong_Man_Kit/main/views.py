from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Site
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from .forms import UserForm, ProjectProposalForm, TeamForm, DescriptionForm, BudgetForm
from django.http import HttpResponseRedirect

# Create your views here.
def homepage(request):
    return render(request = request,template_name = 'main/home.html', context = {'site': Site.objects.all})

def register(request):
    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get("username")
            login(request,user)
        return redirect("main:homepage")
    else:
        form = UserForm()

    return render(request,'main/register.html', context = {'form': form})

def logout_request(request):
    logout(request)
    return redirect("/")

def login_request(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data = request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username = username, password = password)
            if user is not None:
                login(request, user)
                return redirect("/")
    else:
        form = AuthenticationForm()

    return render(request, 'main/login.html', {'form': form})

def save_form(request):
    form = ProjectProposalForm(request.POST)
    if request.method == "POST":

        if form.is_valid():
            form.save()
            return redirect("team.html")

    return render(request, 'main/account.html', {'form': form})

def save_team_form(request):
    form = TeamForm(request.POST)
    if request.method == "POST":

        if form.is_valid():
            form.save()
            return redirect("description.html")

    return render(request, 'main/team.html', {'form': form})

def save_des_form(request):
    form = DescriptionForm(request.POST)
    if request.method == "POST":
        if form.is_valid():
            form.save()
            return redirect("budget.html")

    return render(request, 'main/description.html', {'form': form})

def save_budget_form(request):
    form = BudgetForm(request.POST)
    if request.method == "POST":
        if form.is_valid():
            form.save()
            return redirect("/")

    return render(request, 'main/budget.html', {'form': form})

