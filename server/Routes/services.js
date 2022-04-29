const express = require("express");
const { service_list } = require("../Controlers/Services/list");

const Services = express.Router();

Services.get("/list", service_list);

module.exports = { Services };