//import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authDomain = "dev-9faf5-o9.eu.auth0.com";
const authClientId = "q618pz2fXtpYgmysdNzG0x9tkr1Ql2JS";

// define the Express app
const app = express();

// the database
const meals = [];
// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan("combined"));

// retrieve all meals
app.get("/", (req, res) => {
  const qs = meals.map(meal => ({
    id: meal.id,
    title: meal.title,
    description: meal.description,
    answers: meal.answers.length
  }));
  res.send(qs);
});

// get a specific meal
app.get("/:id", (req, res) => {
  const meal = meals.filter(q => q.id === parseInt(req.params.id));
  if (meal.length > 1) return res.status(500).send();
  if (meal.length === 0) return res.status(404).send();
  res.send(meal[0]);
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://" + authDomain + "/.well-known/jwks.json"
  }),

  // Validate the audience and the issuer.
  audience: authClientId,
  issuer: "https://" + authDomain,
  algorithms: ["RS256"]
});

// insert a new meal
app.post("/", checkJwt, (req, res) => {
  const { title, description } = req.body;
  const newmeal = {
    id: meals.length + 1,
    title,
    description,
    answers: [],
    author: req.user.name
  };
  meals.push(newmeal);
  res.status(200).send();
});

// insert a new answer to a meal
app.post("/answer/:id", checkJwt, (req, res) => {
  const { answer } = req.body;

  const meal = meals.filter(q => q.id === parseInt(req.params.id));
  if (meal.length > 1) return res.status(500).send();
  if (meal.length === 0) return res.status(404).send();

  meal[0].answers.push({
    answer,
    author: req.user.name
  });

  res.status(200).send();
});

// start the server
app.listen(8081, () => {
  console.log("listening on port 8081");
});
