// models/transaction.model.js

const mongoose = require("mongoose");
const Counter = require("./counter.model");

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: Number,
    unique: true,
  },
  orderId: {
    type: Number,
    ref: "Order",
    required: true,
  },
  transactionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  transactionType: {
    type: String,
    maxlength: 255,
    required: true,
  },
  transactionAmount: {
    type: Number,
    required: true,
  },
});

transactionSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "transactionId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.transactionId = counter.sequence_value;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
