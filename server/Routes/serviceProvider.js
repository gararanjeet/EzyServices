const express = require("express");

const {
  serviceProvider_list,
} = require("../Controlers/ServiceProviders/list");

const {
  serviceProvider_delete,
} = require("../Controlers/ServiceProviders/delete");
const { assign } = require("../Controlers/ServiceProviders/assign");

const ServiceProvider = express.Router();

ServiceProvider.get("/list", serviceProvider_list);

ServiceProvider.delete("/delete", serviceProvider_delete);

ServiceProvider.post("/assign", assign);

module.exports = { ServiceProvider };
