// models/product.model.js

const mongoose = require("mongoose");
const Counter = require("./counter.model");

const materialCostSchema = new mongoose.Schema({
  inventoryId: {
    type: Number,
    required: true,
    ref: "Inventory",
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

const measurementSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    maxlength: 255,
  },
  baseMeasurementId: {
    type: Number,
    required: true,
    ref: "BaseMeasurement",
  },
});

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  isDiscounted: {
    type: Boolean,
    default: false,
  },
  discountedPrice: {
    type: Number,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  clothingType: {
    type: String,
    maxlength: 255,
    default: null,
  },
  fitType: {
    type: String,
    maxlength: 255,
    default: null,
  },
  displayImage: {
    type: String,
    maxlength: 255,
    default: null,
  },
  images: [
    {
      isMainDisplay: {
        type: Boolean,
        default: false,
      },
      url: {
        type: String,
        maxlength: 255,
        required: true,
      },
    },
  ],
  measurements: [measurementSchema],
  materialCosts: [materialCostSchema],
});

productSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "productId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.productId = counter.sequence_value;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
