const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    type: {
      type: String,
      enum: ["CUSTOMER", "SERVICE_PROVIDER", "MANAGER"],
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "SUPER_ADMIN", "VEHICLE_WATER_SERVICING"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ACCOUNT", accountSchema);
