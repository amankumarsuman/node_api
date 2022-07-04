const express = require("express");
const { request } = require("../../app");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products");
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "get request to /products",
  });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).json({
    message: "post request to /products",
    createdProduct: product,
  });
});
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "get request to /productsID of categories special",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "get request to /productsID of other categories ",
    });
  }
});
router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "updated request to /productsID ",
  });
});
router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "delete request to /productsID ",
  });
});

module.exports = router;
