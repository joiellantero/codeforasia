# cfa
Code For Asia Scenario Challenge 5 

## How to run
- Install the required dependencies 
```
cd frontend
npm install
cd backend
npm install
npm run servers \\ starts both backend and frontend servers
```

- Visit the main webpage at
`
localhost:3000/
`

## Generating mock data (Optional)
- Generate mock data by running the following. Note that the existing collections will be **dropped**.
```
cd backend
node populateDB.js
```
- 5 test accounts are created with following credentials. 
```
username : password
-------------------
test1 : test1
test2 : test2
...
test5 : test5
``` 