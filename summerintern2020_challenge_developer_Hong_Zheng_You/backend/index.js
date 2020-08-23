require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser"); // to parse json body
const cors = require("cors");
const mongoose = require("mongoose");
const reviewer = require("./controllers/reviewer");
const app = express();
const port = process.env.PORT || 8000;

//using cloud instance of mongoDB
const db =
    process.env.DB ||
    "mongodb+srv://vincenthong:PzWjyLsflqzRtcCx@cfa.j10nv.mongodb.net/cqa?retryWrites=true&w=majority";

const reviewerRouter = require("./routes/reviewer");
const debugRouter = require("./routes/debug");

app.use(cors());
app.use(bodyParser.json());

app.use("/", reviewerRouter);

// debug purposes
app.use("/debug", debugRouter);

mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server and Database running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
