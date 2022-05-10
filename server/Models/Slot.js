const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Not used

const slotSchema = new Schema(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "service",
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      reqruied: true,
    },
    isActive: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Slot", slotSchema);
