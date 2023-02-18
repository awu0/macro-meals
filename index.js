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
  const { gender } = req.body;

  const age = parseInt(req.body.age);
  const weight = parseInt(req.body.weight);
  const height = parseInt(req.body.height);

  // basal metabolic rate (bmr) is average energy expended per day
  let bmr;
  if (gender == "male") {
    bmr = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
  } else {
    bmr = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
  }

  const data = await apis.callAPI("mcdonalds");

  const foods = data.hits;

  res.render("calories", {
    gender,
    age,
    weight,
    height,
    bmr,
    foods: foods ? foods : {},
  });
});

app.get("/test", async (req, res) => {
  const response = await apis.callAPI("chipotle");
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
