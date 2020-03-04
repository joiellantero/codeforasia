#run in python 3.7 or above

from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import pandas as pd
import re
import math
import os
import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
if not os.path.exists('output_cert'):
    os.makedirs('output_cert')

def emailLogin():
    sender_address = 'brianchancodeforasiaass@gmail.com'
    sender_pass = 'Briancodeforasia1'
    print("Starting session...")
    try:
        session = smtplib.SMTP('smtp.gmail.com', 587)
        session.starttls()
    except Exception as e:
        print("Something went wrong when starting session. Check if address and port number correct or try again later.")
        print("Error:", e)
        exit()
    print("Logining...")
    try:
        session.login(sender_address, sender_pass)
    except:
        print("Password Not correct!!!")
        exit()
    print("Login ok")
    return session
    
def sendEmail(session, name, img, destEmail):
    msgcontent = f"Dear {name},\n\nThanks for participating this event. Please check your certificate in the attachment.\n\nBR,\nCode for Asia"
    #prepare email content
    msg = MIMEMultipart()
    msg.add_header('Content-Disposition', 'attachment', filename=f'{re.sub(" ","_",name)}.png')
    text = MIMEText(msgcontent)
    msg.attach(text)
    image = MIMEImage(img, name=f'{re.sub(" ","_",name)}.png')
    msg.attach(image)
    msg['Subject'] = 'Participation certificate of Code For Asia'
    msg['From'] = "brianchancodeforasiaass@gmail.com"
    msg['To'] = destEmail
    #send
    text = msg.as_string()
    try:
        session.sendmail(destEmail, msg['To'], text)
        print(f"Email successfully sent to {name}")
    except:
        print(f"Cannot find {name}'s address")

#main():    
print("Welcome to cert generator")
print("1) Generator cert using nameList.csv")
print("2) Generator cert using nameList.csv and send an email to all awardees")
print("3) Manually input namelist to generate cert")
print("4) Manually input namelist to generate cert and send email to all awardees")
state = input("Enter the number of the operation: ")
while state.isdigit() == False or (int(state) < 1 or int(state) > 4):
    state = input("Please enter the valid operation: ")
try:
    oimg = Image.open("CertBlank.png")
except:
    print("Cannot find the CertBlank.png in current directory.")
    exit()
W, H = (528, 430)
state = int(state)
if(state == 1 or state ==2):
    namepd = pd.read_csv("nameList.csv")
    namelist = list(namepd["Name"])
    emaillist = list(namepd["Email"])
elif(state == 3):
    print('Please input the Names separate by ",":')
    namelist = input("Input: ").split(",")
    print(f"{len(namelist)} name inputed.")
else:
    print('Please input the Names separate by ",":')
    namelist = input("Input: ").split(",")
    print(f"{len(namelist)} name inputed.")
    print('Please input the Emails separate by "," (Order should be corresponding the names):')
    emaillist = input("Input: ").split(",")
    print(f"{len(emaillist)} email inputed.")
    if (len(namelist) != len(emaillist)):
        print("Number of awardees name not match number of awardees email")
        print("Please try again. ")
        exit()
    for i in namelist:
        i.lstrip()
    for i in emaillist:
        i.lstrip()
if (state == 2 or state == 4):
    session = emailLogin()
index = 0  #prevent same name then overwrite the file

for nam in namelist:
    name = nam.lstrip()
    img = oimg.copy()
    index += 1
    draw = ImageDraw.Draw(img)
    try:
        if len(name) <= 10:
            font = ImageFont.truetype("testingFont.ttf", 100)
        else:
            font = ImageFont.truetype("testingFont.ttf", 50)
    except:
        print("Cannot find the font file in current directory.")
        exit()
    w, h = draw.textsize(name, font=font)
    draw.text((W - w / 2, H - h / 2), name, (0, 0, 0), font=font, align="center")
    img.save(f'output_cert/{re.sub(" ","_",name)}_{index}.png')
    with open(f'output_cert/{re.sub(" ","_",name)}_{index}.png', "rb") as fi:
        if (state == 2 or state == 4):
            if (str(emaillist[index - 1]) != "nan"):
                sendEmail(session, name, fi.read(), emaillist[index - 1])
            else:
                print(f"Cannot find {name}'s address")
print("Finished generating all the certificates, please check the 'output_cert' folder")
if(state == 2 or state ==4):
    session.quit()

