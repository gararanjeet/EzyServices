const express = require("express");

const { serviceProvider_list } = require("../Controlers/ServiceProviders/list");

const {
  serviceProvider_delete,
} = require("../Controlers/ServiceProviders/delete");
const {
  serviceProvider_assign,
} = require("../Controlers/ServiceProviders/assign");

const {
  serviceProvider_Order_list,
} = require("../Controlers/ServiceProviders/order_list");

const ServiceProvider = express.Router();
// get all serviceProviders
ServiceProvider.get("/list", serviceProvider_list);

// delete serviceProvider
ServiceProvider.delete("/delete", serviceProvider_delete);

//assign a order to serviceProvider
ServiceProvider.post("/assign", serviceProvider_assign);

//get all services assigned to a serviceProvider
ServiceProvider.get("/orders", serviceProvider_Order_list);

module.exports = { ServiceProvider };
