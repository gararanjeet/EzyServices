const express = require("express");
const { verify } = require("jsonwebtoken");
const successPayment = require("../Controlers/Payments/success_payment");
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

Payment.post("/success", successPayment);

module.exports = { Payment };
