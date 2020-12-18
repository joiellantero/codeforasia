from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm

class SignupForm(UserCreationForm):
    username = forms.CharField(
        label = 'Username',
        widget = forms.TextInput(attrs={
            'class': 'input username'
        }),
        max_length = 20,
        min_length = 5
    )

    email = forms.EmailField(
        label = 'Email',
        widget = forms.TextInput(attrs = {
            'class':'input email'
        }),
        max_length = 100
    )

    password1 = forms.CharField(
        label = 'Password',
        widget = forms.PasswordInput(attrs = {
            'class':'input password1',
        }),
    )

    password2 = forms.CharField(
        label = 'Confirm Password',
        widget = forms.PasswordInput(attrs = {
            'class':'input password2',
        }),
    )

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2']


class AuthenticationForm(forms.ModelForm):
    username = forms.CharField(
        required=True,
        label = 'Username',
        widget = forms.TextInput(attrs = {
            'class': 'input',
            'autofocus':'autofocus'
        }),
    )

    password = forms.CharField(
        required=True,
        label = 'Password',
        widget = forms.PasswordInput(attrs = {
            'class': 'input',
        }),
    )

    class Meta:
        model = User
        fields = ["username", "password"]

    def clean(self):
        if self.is_valid():
            username = self.cleaned_data['username']
            password = self.cleaned_data['password']
            if not authenticate(username=username, password=password):
                raise forms.ValidationError("Invalid Credentials")


class EditAccountForm(UserChangeForm):
    first_name = forms.CharField(
        label = 'First Name',
        widget = forms.TextInput(attrs = {
            'class':'input first_name',
            'autofocus':'autofocus'
        }),
        max_length = 60,
        min_length = 3
    )

    last_name = forms.CharField(
        label = 'Last Name',
        widget = forms.TextInput(attrs = {
            'class':'input last_name'
        }),
        max_length = 60,
        min_length = 2
    )

    email = forms.EmailField(
        required = False,
        label = 'Email',
        widget = forms.TextInput(attrs = {
            'class':'input email'
        }),
        max_length = 100
    )

    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'password'
        )


class PasswordChangeForm(PasswordChangeForm):
    old_password = forms.CharField(
        required=True,
        label = 'Old Password',
        widget = forms.PasswordInput(attrs = {
            'class': 'input',
        }),
    )

    new_password1 = forms.CharField(
        required=True,
        label = 'New Password',
        widget = forms.PasswordInput(attrs = {
            'class': 'input',
        }),
    )

    new_password2 = forms.CharField(
        required=True,
        label = 'New Password Confirmation',
        widget = forms.PasswordInput(attrs = {
            'class': 'input',
        }),
    )

    class Meta:
        model = User
        fields = (
            'old_password',
            'new_password1',
            'new_password2'
        )

class SchedulerForm(forms.Form):
    phone_number = forms.CharField(
        required = True,
        label = 'Phone',
        widget = forms.TextInput(attrs = {'class':'input'}),
        max_length = 10
    )

    date = forms.DateTimeField(
        required = True,
        label = 'Schedule',
        input_formats=['%m/%d/%Y %H:%M'],
        widget = forms.TextInput(attrs = {'class':'input'}),
    )

    subject = forms.CharField(
        required = True,
        label = 'Subject',
        widget = forms.TextInput(attrs = {'class':'input'}),
        max_length = 125
    )

    message = forms.CharField(
        required = False,
        label = 'Message',
        widget = forms.Textarea(attrs = {'class':'textarea', 'rows':5}),
    )

    class Meta:
        fields = [
            'phone_number',
            'date',
            'subject',
            'message',
        ]

