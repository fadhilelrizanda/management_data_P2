// models/productionEmployee.model.js

const mongoose = require("mongoose");
const Counter = require("./counter.model");

const productionEmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  role: {
    type: String,
    maxlength: 255,
    default: null,
  },
  contactNumber: {
    type: String,
    maxlength: 255,
    default: null,
  },
  address: {
    type: String,
    maxlength: 1024,
    default: null,
  },
  hireDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

productionEmployeeSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "employeeId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.employeeId = counter.sequence_value;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const ProductionEmployee = mongoose.model("ProductionEmployee", productionEmployeeSchema);

module.exports = ProductionEmployee;
