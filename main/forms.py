from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Form, Member, Description, Budget

class UserForm(UserCreationForm):
    email = forms.EmailField(required = True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def save(self, commit = True):
        user = super(NewUserForm, self).save(commit = False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user

class ProjectProposalForm(forms.ModelForm):
    class Meta:
        model = Form
        fields = ['name', 'sdg', 'des', 'date', 'place', 'for_whom', 'why', 'objective',
        'Key_result_1', 'Key_result_2','Key_result_3','Key_result_4']

    def save(self, commit = True):
        form = super(ProjectProposalForm, self).save(commit = False)
        form.name = self.cleaned_data['name']
        if commit:
            form.save()
        return form

    def __init__(self, *args, **kwargs):
        super(ProjectProposalForm, self).__init__(*args, **kwargs)
        self.fields['Key_result_2'].required = False
        self.fields['Key_result_3'].required = False
        self.fields['Key_result_4'].required = False



class TeamForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = ["team_name", "leader_name", "leader_mobile", "leader_email",
                'name', 'mobile', 'role','birth_date', 'school', 'job']

class DescriptionForm(forms.ModelForm):
    class Meta:
        model = Description
        fields = ["team_name", "demographics", "channels", "impact", "activities", "innovative", "challenges"]

class BudgetForm(forms.ModelForm):
    class Meta:
        model = Budget
        fields = ["team_name", "item_1", "cost_1", "item_2", "cost_2", "item_3", "cost_3", "item_4", "cost_4"]

    def __init__(self, *args, **kwargs):
        super(BudgetForm, self).__init__(*args, **kwargs)
        self.fields['item_2'].required = False
        self.fields['cost_2'].required = False
        self.fields['item_3'].required = False
        self.fields['cost_3'].required = False
        self.fields['item_4'].required = False
        self.fields['cost_4'].required = False
