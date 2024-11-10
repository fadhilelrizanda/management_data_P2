// models/baseMeasurement.model.js
const mongoose = require("mongoose");

const baseMeasurementSchema = new mongoose.Schema({
  patternId: {
    type: Number,
    unique: true,
  },
  isLongArmed: {
    type: Boolean,
    default: false,
  },
  isButtoned: {
    type: Boolean,
    default: false,
  },
  isCollared: {
    type: Boolean,
    default: false,
  },
  measurements: {
    neckWidth: {
      type: Number,
      default: null,
    },
    chestWidth: {
      type: Number,
      default: null,
    },
    abdominalWidth: {
      type: Number,
      default: null,
    },
    shoulderWidth: {
      type: Number,
      default: null,
    },
    upperArmWidth: {
      type: Number,
      default: null,
    },
    lowerArmWidth: {
      type: Number,
      default: null,
    },
    torsoLength: {
      type: Number,
      default: null,
    },
    armLength: {
      type: Number,
      default: null,
    },
  },
});

// Auto-increment patternId using a pre-save hook
baseMeasurementSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const Counter = require("./counter.model");
      const counter = await Counter.findByIdAndUpdate(
        { _id: "patternId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.patternId = counter.sequence_value;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const BaseMeasurement = mongoose.model("BaseMeasurement", baseMeasurementSchema);

module.exports = BaseMeasurement;
