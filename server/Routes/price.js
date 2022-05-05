const express = require("express");
const { getPrice } = require("../Controlers/Prices/waterServiving");

Price = express.Router();

Price.get("/waterServicing/:subservice", getPrice);

module.exports = { Price };
