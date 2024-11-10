// models/productAnalytic.model.js

const mongoose = require("mongoose");

const productAnalyticSchema = new mongoose.Schema({
  analyticId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  productId: {
    type: Number,
    required: true,
    ref: "Product",
  },
  eventType: {
    type: String,
    required: true,
    maxlength: 255,
  },
  eventDate: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const ProductAnalytic = mongoose.model("ProductAnalytic", productAnalyticSchema);

module.exports = ProductAnalytic;
