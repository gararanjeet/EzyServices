const express = require("express");

const {
  serviceProvider_list,
} = require("../Controlers/ServiceProviders/ServiceProvider");

const {
  serviceProvider_delete,
} = require("../Controlers/ServiceProviders/DeleteServiceProvider");
const { assign } = require("../Controlers/ServiceProviders/Assign");

const ServiceProvider = express.Router();

ServiceProvider.get("/list", serviceProvider_list);

ServiceProvider.delete("/delete", serviceProvider_delete);

ServiceProvider.post("/assign", assign);

module.exports = { ServiceProvider };
