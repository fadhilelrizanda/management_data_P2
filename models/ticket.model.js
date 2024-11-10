// models/ticket.model.js

const mongoose = require("mongoose");
const Counter = require("./counter.model");

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: Number,
    unique: true,
  },
  orderId: {
    type: Number,
    ref: "Order",
  },
  userId: {
    type: Number,
    required: true,
    ref: "User",
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    maxlength: 255,
    default: "Open",
  },
  ticketType: {
    type: String,
    maxlength: 255,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
});

ticketSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "ticketId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.ticketId = counter.sequence_value;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
