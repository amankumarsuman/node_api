const express = require("express");
const { request } = require("../../app");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "get request to /orders",
  });
});

router.post("/", (req, res, next) => {
  const order = {
    productID: req.body.productID,
    quantity: req.body.quantity,
  };
  res.status(201).json({
    message: "order creates to /orders",
    order: order,
  });
});
router.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  if (orderId === "special") {
    res.status(200).json({
      message: "get request to  create new order of categories special",
      orderId: orderId,
    });
  } else {
    res.status(200).json({
      message: "get request to /productsID of other categories ",
    });
  }
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "order deleted",
  });
});

module.exports = router;
