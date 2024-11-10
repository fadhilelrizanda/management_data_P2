// models/user.model.js
const mongoose = require("mongoose");
const Counter = require("./counter.model");

const addressSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  addressName: {
    type: String,
    maxlength: 255,
  },
  province: {
    type: String,
    maxlength: 255,
  },
  city: {
    type: String,
    maxlength: 255,
  },
  street: {
    type: String,
    maxlength: 255,
  },
  zipcode: {
    type: String,
    maxlength: 255,
  },
});

const measurementSchema = new mongoose.Schema({
  patternId: {
    type: Number, // Changed to Number to match BaseMeasurement's patternId
    required: true,
    ref: "BaseMeasurement",
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  measurementName: {
    type: String,
    maxlength: 255,
  },
  measurementType: {
    type: String,
    enum: ["custom", "regular"],
    required: true,
  },
  adjustedMeasurements: {
    // Only present if measurementType is "custom"
    neckWidth: Number,
    chestWidth: Number,
    abdominalWidth: Number,
    shoulderWidth: Number,
    upperArmWidth: Number,
    lowerArmWidth: Number,
    torsoLength: Number,
    armLength: Number,
  },
});

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  phoneNumber: {
    type: String,
    maxlength: 255,
    default: null,
  },
  email: {
    type: String,
    maxlength: 255,
    default: null,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  passwordHash: {
    type: String,
    maxlength: 255,
    default: null,
  },
  addresses: [addressSchema],
  measurements: [measurementSchema],
});

// Auto-increment userId using a pre-save hook
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "userId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.userId = counter.sequence_value;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
