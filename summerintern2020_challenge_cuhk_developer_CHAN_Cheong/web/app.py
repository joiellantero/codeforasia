import requests
from flask import Flask, render_template, request, session, flash, redirect, url_for, jsonify
from flask_session import Session
import main

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = 'FALSE'
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route('/')
def index():
    return render_template('index.html', flag=True)


@app.route('/get', methods=['GET', 'POST'])
def get():
    namelist = request.form.get('namelist').split(",")
    emaillist = request.form.get('emaillist').split(",")
    state = request.form.get('gen')
    try:
        emailOK, emailFail, errorCode = main.start(state, namelist, emaillist)
        if (errorCode == "nameEmailNotMatch"):
            return render_template('nameEmailNotMatch.html', flag=True)
        elif (errorCode == "sessionProblem"):
            return render_template('sessionProblem.html', flag=True)
    except:
        print("something wrong")
        return render_template('error.html', flag=True)
    return render_template('back.html', flag=True, state = state, emailOK = emailOK, emailFail = emailFail)
    # a = highlightTwoSentenceSameTerm.start([sentence1, sentence2])
    
    # # print(a)
    # T1 = []
    # for i in a['T1']:
    #     if i in a['common']:
    #         x = '<span class="writebg">' + i + "</span>"
    #         T1.append(x)
    #     else:
    #         T1.append(i)
    # T2 = []
    # for i in a['T2']:
    #     if i in a['common']:
    #         x = '<span class="writebg">' + i + "</span>"
    #         T2.append(x)
    #     else:
    #         T2.append(i)
    # T1 = sorted(T1)
    # T2 = sorted(T2)
    # return render_template('back.html', flag=True, T1='\n'.join(T1), T2='\n'.join(T2), common=a['common'], lenn=a['len'])
