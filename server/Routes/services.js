const express = require("express");
const { getServices } = require("../Controlers/Services /list");

const Services = express.Router();

Services.get("/", getServices);

module.exports = { Services };
