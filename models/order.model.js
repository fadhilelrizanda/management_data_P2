// models/order.model.js

const mongoose = require("mongoose");
const Counter = require("./counter.model");

const userAddressSchema = new mongoose.Schema({
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

const userMeasurementSchema = new mongoose.Schema({
  patternId: {
    type: Number,
    required: true,
    ref: "BaseMeasurement",
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

const orderItemSchema = new mongoose.Schema({
  itemNumber: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  userMeasurement: {
    type: userMeasurementSchema,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
  },
  userId: {
    type: Number,
    required: true,
    ref: "User",
  },
  address: {
    type: userAddressSchema,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    maxlength: 255,
    default: "Pending",
  },
  fulfillmentStatus: {
    type: String,
    maxlength: 255,
    default: "Unfulfilled",
  },
  items: [orderItemSchema],
});

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "orderId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.orderId = counter.sequence_value;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
