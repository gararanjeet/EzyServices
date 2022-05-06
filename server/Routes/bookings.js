const express = require("express");
const { verifyCustomer } = require("../Middleware/VerifyCustomer");
const { verifySuperAdmin } = require("../Middleware/VerifySuperAdmin");

const {
  booking_vehicleWaterService_create,
} = require("../Controlers/Bookings/vehicleWaterService_create");

const { bookings_list_user } = require("../Controlers/Bookings/list_user");

const { bookings_list } = require("../Controlers/Bookings/list");

const { booking_delete } = require("../Controlers/Bookings/delete_booking");

const {
  booking_details,
} = require("../Controlers/Bookings/sinigle_booking_details");
const { verify } = require("jsonwebtoken");

const Bookings = express.Router();

Bookings.get("/list", verifySuperAdmin, bookings_list);

Bookings.post(
  "/vehicleWaterService_create",
  verifyCustomer,
  booking_vehicleWaterService_create
);

Bookings.delete("/delete", verifyCustomer, booking_delete);

Bookings.get("/list_user", verifyCustomer, bookings_list_user);

Bookings.get("/singleBookingDetails", verifyCustomer, booking_details);

module.exports = { Bookings };
