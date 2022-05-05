const express = require("express");
const {
  waterServicing_order_create,
} = require("../Controlers/Payments/waterservicing_create_order");

Payment = express.Router();

Payment.post("/waterServicing/:subservice", waterServicing_order_create);

module.exports = { Payment };
