require("dotenv").config();

const express = require("express");
const axios = require("axios");
const apis = require("./apis");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const { gender, query } = req.body;

  const age = parseInt(req.body.age);
  const weight = parseInt(req.body.weight);
  const height = parseInt(req.body.height);

  // calories is calculated using basal metabolic rate (bmr), or average energy expended per day
  // the formula used is Revised Harris-Benedict Equation
  let calories;
  if (gender == "male") {
    calories = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
  } else {
    calories = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
  }

  const data = await apis.callAPI(query, 0, calories + 100);

  const foods = data.hits;

  res.render("calories", {
    gender,
    age,
    weight,
    height,
    calories,
    query,
    foods: foods ? foods : {},
  });
});

app.get("/test", async (req, res) => {
  const response = await apis.callAPI("chipotle", 1000, 100000);
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
