const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Box = require("../database/models/box.model");

var app = express();
let port = 8081;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };

let databaseName = "progWeb";
let url = "mongodb://localhost:27017/" + databaseName;
mongoose.connect(url, mongooseOptions);

const db = mongoose.connection;
db.once("open", _ => {
  console.log("Database connected:", url);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/box", async (request, response) => {
  try {
    //console.log(request.body);
    var box = new Box(request.body);
    var result = await box.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/boxes", async (request, response) => {
  try {
    var result = await Box.find({
      ownerEmail: request.query.ownerEmail
    }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/box/:id", async (request, response) => {
  try {
    var box = await Box.findById(request.params.id).exec();
    response.send(box);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/box/:id", async (request, response) => {
  try {
    var box = await Box.findById(request.params.id).exec();
    box.set(request.body);
    console.log(box);
    var result = await box.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/box/:id", async (request, response) => {
  try {
    var result = await Box.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
