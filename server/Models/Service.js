const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slot = new Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const subService = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
});

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    //slot list
    slots: {
      type: [String],
    },
    subServices: {
      type: [subService],
    },
    slotLimit: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
