const express = require("express");
const { service_list } = require("../Controlers/Services/list");
const {
  service_vehicleWaterServicing_complete,
} = require("../Controlers/Services/vehicleWaterServicing_completed");

const Services = express.Router();

Services.get("/list", service_list);

Services.patch(
  "/vehicleWaterServicing_complete",
  service_vehicleWaterServicing_complete
);

module.exports = { Services };