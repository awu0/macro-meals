require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
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

  res.render("calories", { gender: gender, age: age, weight: weight, height: height, bmr: bmr });
});

app.get("/test", async (req, res) => {
  const response = await callAPI();
  res.send(response);
});

async function callAPI() {
  const appId = process.env.appId;
  const appKey = process.env.appKey;

  try {
    const response = await axios.get(
      `https://api.nutritionix.com/v1_1/search/subway?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=${appId}&appKey=${appKey}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
