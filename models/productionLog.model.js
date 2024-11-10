// models/productionLog.model.js

const mongoose = require("mongoose");

const productionLogSchema = new mongoose.Schema({
  logId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  orderId: {
    type: Number,
    required: true,
    ref: "Order",
  },
  itemNumber: {
    type: Number,
    required: true,
  },
  employeeId: {
    type: Number,
    required: true,
    ref: "ProductionEmployee",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  workType: {
    type: String,
    maxlength: 255,
    required: true,
  },
  status: {
    type: String,
    maxlength: 255,
    default: "In Progress",
  },
  notes: {
    type: String,
    maxlength: 1024,
    default: null,
  },
});

const ProductionLog = mongoose.model("ProductionLog", productionLogSchema);

module.exports = ProductionLog;
