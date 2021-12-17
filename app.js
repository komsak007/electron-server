const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./router/auth");
const siteRouter = require("./router/site");
const sensorRouter = require("./router/sensor");

// main App
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// router
app.use("/api", authRouter);
app.use("/api", siteRouter);
app.use("/api", sensorRouter);

// Connect Database
mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("Database Connected!");
});

app.get("/", (req, res) => {
  res.json({ hello: "hello" });
});

app.listen(8000, () => {
  console.log("Server running at port 8000");
});
