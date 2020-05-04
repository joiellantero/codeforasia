let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let dbConfig = require('./data/db');

// Express Route
const formRoute = require('./Routes/form.routes');

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log('MongoDB connected!')
},
  error => {
    console.log('Bop! : ' + error)
  }
)

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/forms', formRoute);
app.use('/users', userRoute);


// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(console.log('404'));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});