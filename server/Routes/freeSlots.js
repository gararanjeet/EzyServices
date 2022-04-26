const express = require("express");
const { freeSlots } = require("../Controlers/FreeSlots/freeSlots");

FreeSlots = express.Router();

FreeSlots.get("/waterServicing", freeSlots);

module.exports = { FreeSlots };
