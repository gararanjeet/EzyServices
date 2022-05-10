const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderStatusSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "order",
      required: true,
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
    remarks: {
      type: String,
    },
    statusBy: {
      type: Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderStatus", orderStatusSchema);
