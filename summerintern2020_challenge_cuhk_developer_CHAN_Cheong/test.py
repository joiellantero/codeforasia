import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from os.path import basename

sender_address = 'brianchancodeforasiaass@gmail.com'
sender_pass = 'Briancodeforasia1'
msg = MIMEMultipart()
name = "IoHang"
msgcontent = f"Dear {name},\n\nThanks for participating this event. Please check your certificate in the attachment.\n\nBR,\nCode for Asia"
text = MIMEText(msgcontent)
msg.attach(text)
f = 'output_cert/Tim_Cook_3.png'
msg.add_header('Content-Disposition', 'attachment', filename=basename(f))
with open(f, "rb") as fi:
    image = MIMEImage(fi.read(), name=basename(f))
    msg.attach(image)
msg['Subject'] = 'Participation certificate of Code For Asia'
msg['From'] = "brianchancodeforasiaass@gmail.com"
msg['To'] = "brianchan"

# Send the message via our own SMTP server.
print("start session")
session = smtplib.SMTP('smtp.gmail.com', 587)  # use gmail with port
session.starttls()  # enable security
print("logining")
session.login(sender_address, sender_pass)  # login with mail_id and password

text = msg.as_string()
session.sendmail(sender_address, msg['To'], text)
session.quit()
