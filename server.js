// Import API routers
const router = require("./api/routes/router");
const noteRouter=require("./api/routes/noteRouter")
const noteServices = require("./api/services/note.services");

// Import express
const express = require("express");
// Import Body parser
var bodyParser = require("body-parser");
// create express app
const app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
//To perform validations
var expressValidator = require('express-validator')
app.use(expressValidator());
// Configuring the database
const databaseConfig = require("./configuration/database.configuration");

// Import Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require ('dotenv').config();
// Connecting to the database
mongoose
  .connect(databaseConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

mongoose.set('useCreateIndex', true);
require("http").createServer(app);
app.use("/", router);
app.use("/",noteRouter);

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Fundoo App"
  });
});

// listen for requests
const server = app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

var schedular=require("node-schedule");
var j=schedular.scheduleJob("*/1 * * * *",function(){
  noteServices.checkReminders();
  console.log("note service in server.js");
  
});


module.exports = app;