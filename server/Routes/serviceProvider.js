const express = require("express");

const { serviceProvider_list } = require("../Controlers/ServiceProviders/list");

const {
  serviceProvider_delete,
} = require("../Controlers/ServiceProviders/delete");
const {
  serviceProvider_assign,
} = require("../Controlers/ServiceProviders/assign");

const {
  serviceProvider_awaiting_list,
} = require("../Controlers/ServiceProviders/awaiting");

const {
  serviceProvider_accepted_list,
} = require("../Controlers/ServiceProviders/order_list");

const {
  serviceProvider_decision,
} = require("../Controlers/ServiceProviders/decision");

const {
  serviceProvider_completed_list,
} = require("../Controlers/ServiceProviders/completed");

const ServiceProvider = express.Router();
// get all serviceProviders
ServiceProvider.get("/list", serviceProvider_list);

// delete serviceProvider
ServiceProvider.delete("/delete", serviceProvider_delete);

//assign a booking to serviceProvider
ServiceProvider.post("/assign", serviceProvider_assign);

//get all booking which are in awaiting state for a serviceProvider
ServiceProvider.get("/awaiting", serviceProvider_awaiting_list);

//get all booking accepted by a serviceProvider
ServiceProvider.get("/accepted", serviceProvider_accepted_list);

//decision is pending by serviceProvider Accept or Reject the assigned service
ServiceProvider.patch("/decision", serviceProvider_decision);

//get all booking completed by a serviceProvider
ServiceProvider.get("/completed", serviceProvider_completed_list);

module.exports = { ServiceProvider };
