const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//importing productRoutes
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

//connecting database
mongoose.connect(
  "mongodb+srv://alkaaman:" +
    process.env.MONGO_ATLAS_PASSWORD +
    "@cluster0.mlxbgdo.mongodb.net/?retryWrites=true&w=majority"
);
//midlewares
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept,Authorization,application/json"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    return res.status(200).json({});
  }
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

//catching error if no routes matches
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
app.use((req, res, next) => {
  res.status(200).json({
    message: "Success",
  });
});

module.exports = app;
