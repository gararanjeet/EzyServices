const express = require("express");

const {
  booking_vehicleWaterService_create,
} = require("../Controlers/Bookings/vehicleWaterService_create");

const { bookings_list_user } = require("../Controlers/Bookings/list_user");

const { bookings_list } = require("../Controlers/Bookings/list");

const Bookings = express.Router();



Bookings.get("/list", bookings_list);

Bookings.post(
  "/vehicleWaterService_create",
  booking_vehicleWaterService_create
);

Bookings.get("/list_user", bookings_list_user);

module.exports = { Bookings };
