//we will store senstive data in .env file like keys, port numbers etc
// install the package dotenv. We can access the variables in .env file using process which is globally available
require("dotenv").config();
const express = require("express");
const workoutRouter = require("./routes/workout");
//this time we will use mongoose library to interact with the DB
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;

//to get request parameters
app.use(express.json());

//to get body parameters
app.use(express.urlencoded({ extended: true }));

//middleware for details -
app.use((req, res, next) => {
  console.log("Request is made");
  console.log("Host name - " + req.hostname);
  console.log("Host name - " + req.path);
  console.log("Host name - " + req.method);
  next(); // to move on
});

//Routes
app.use("/api/workouts", workoutRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB database connection established");
    app.listen(port, () => console.log(`Listening on port : ${port}!`));
  })
  .catch((err) => {
    console.log("Error connecting with the MongoDB database");
  });

  
