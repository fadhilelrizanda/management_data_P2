// models/inventory.model.js
const mongoose = require("mongoose");
const Counter = require("./counter.model");

const inventorySchema = new mongoose.Schema({
  inventoryId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    maxlength: 255,
    required: true,
  },
  type: {
    type: String,
    maxlength: 255,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  uom: {
    type: String,
    maxlength: 255,
    required: true,
  },
});

inventorySchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "inventoryId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.inventoryId = counter.sequence_value;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
