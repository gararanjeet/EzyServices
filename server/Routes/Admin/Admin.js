const express = require("express");
const { deleteServiceProvider } = require("./DeleteServiceProvider");
const { getBookings } = require("./GetBookings");
const { allServiceProviders } = require("./ServiceProvider");
const { getServices } = require("./Services");

const Admin = express.Router();

Admin.get("/serviceProviders", allServiceProviders);

Admin.get("/services", getServices);

Admin.get("/bookings", getBookings);

Admin.delete("/deleteServiceProvider", deleteServiceProvider);

module.exports = { Admin };
