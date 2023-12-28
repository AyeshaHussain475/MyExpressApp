const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");

env.config();
const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@clothingbranddb.crpccgp.mongodb.net/`
  )
  .then(() => {
    console.log("Database is connected");
  });

app.use("/api", routes);
app.get("/home", (req, res) => {
  return res.render("home");
});

app.get("/signin", (req, res) => {
  return res.render("signin");
});

app.get("/signup", (req, res) => {
  return res.render("signup");
});

app.get("/createP", (req, res) => {
  return res.render("product");
});

app.get("/dashboard", (req, res) => {
  return res.render("dashboard");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
