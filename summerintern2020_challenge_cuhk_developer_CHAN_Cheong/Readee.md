# Chan Cheong, brianchan.xd@gmail.com , challenge 2
Sorry for using flask to do this challenge as in I don't I should use MEAN stack at the very beginning. I can show you a website which I have made previously by using ReactJS, NodeJS and MongoDB if you want to. Free feel to ask me to do so.  

## To Run the program  
For normal python  
`python main.py`  
Just follow the instruction

For Web UI  
`cd web`  
`flask run`  
open the link shown in terminal

## Notes: For normal python  
Please insert all the name of awardees in nameList.csv  
Please keep the first row in nameList.csv(as the column name)  
Start inserting the name and email from the second row  
Separate the name and email by ","  
An example of what should be inside the __**nameList.csv**__ is as following  
  
Name,Email  
Brian Chan, brianchan.xd@gmail.com  
Ada Wong, brianchanbt@gmail.com  
Smart Bean,    
HelloWorld,  

**Please Do NOT change the first row of nameList.csv**  

## Notes: For WebUI  
Input the names and emails in the given fields  
Pay attention to the input order  
For example, if I need to generate two certs for **ada** and **tom**. Their email are ada110@gmail.com and tom@yahoo.com respectively.  
I should input  
`Ada, Tom` in the Name field.  
`ada110@gmail.com, tom@yahoo.com` in the Email field