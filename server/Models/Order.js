const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    bookingUid: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      enum: ["VEHICLE_WATER_SERVICING"],
      required: true,
    },
    subService: {
      type: String,
      required: true,
    },
    serviceDate: {
      type: Date,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      reqruied: true,
    },
    status: {
      type: String,
      enum: [
        "PENDING",
        "AWAITING",
        "ACCEPTED",
        "REJECTED",
        "CANCELLED",
        "REJECTED",
      ],
      reqruied: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "account",
    },
    rating: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
