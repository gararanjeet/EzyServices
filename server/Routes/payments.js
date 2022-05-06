const express = require("express");
const { verify } = require("jsonwebtoken");
const {
  waterServicing_order_create,
} = require("../Controlers/Payments/waterservicing_create_order");
const { verifyCustomer } = require("../Middleware/VerifyCustomer");

Payment = express.Router();

Payment.post(
  "/waterServicing/:subservice",
  verifyCustomer,
  waterServicing_order_create
);

module.exports = { Payment };
