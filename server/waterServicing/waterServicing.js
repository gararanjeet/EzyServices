const express = require("express");
const { getServiceProviders } = require("../getServiceProviders");
const { verifySuperAdmin } = require("../jwt");
const { booking } = require("./booking");
const { bookingDetails } = require("./bookingDetails");
const { freeSlots } = require("./freeSlots");
const { getPendingBookings } = require("./pendingBookings");

const waterServicing = express.Router();

waterServicing.post("/booking", booking);

waterServicing.post("/freeSlots", freeSlots);

waterServicing.post("/bookingDetails", bookingDetails);

waterServicing.get(
  "/getServiceProviders",
  verifySuperAdmin,
  getServiceProviders
);

waterServicing.get(
  "/getPendingBookinigs",
  verifySuperAdmin,
  getPendingBookings
);

module.exports = { waterServicing };
