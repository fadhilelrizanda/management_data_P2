// models/inventoryLog.model.js

const mongoose = require("mongoose");

const inventoryLogSchema = new mongoose.Schema({
  logId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  inventoryId: {
    type: Number,
    required: true,
    ref: "Inventory",
  },
  orderId: {
    type: Number,
    ref: "Order",
  },
  itemNumber: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["IN", "OUT"],
    required: true,
  },
  description: {
    type: String,
    maxlength: 1024,
    default: null,
  },
});

const InventoryLog = mongoose.model("InventoryLog", inventoryLogSchema);

module.exports = InventoryLog;
