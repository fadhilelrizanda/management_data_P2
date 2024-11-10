// services/production.service.js

const ProductionEmployee = require("../models/productionEmployee.model");
const ProductionLog = require("../models/productionLog.model");
const Order = require("../models/order.model");

// Production Employee Functions

const createEmployee = async (data) => {
  const employee = new ProductionEmployee(data);
  return await employee.save();
};

const getAllEmployees = async () => {
  return await ProductionEmployee.find();
};

const getEmployeeById = async (employeeId) => {
  return await ProductionEmployee.findOne({ employeeId });
};

const updateEmployee = async (employeeId, updateData) => {
  return await ProductionEmployee.findOneAndUpdate({ employeeId }, updateData, { new: true });
};

const deleteEmployee = async (employeeId) => {
  return await ProductionEmployee.findOneAndDelete({ employeeId });
};

// Production Log Functions

const createProductionLog = async (data) => {
  // Validate employee
  const employee = await ProductionEmployee.findOne({ employeeId: data.employeeId });
  if (!employee) throw new Error("Employee not found");

  // Validate order
  const order = await Order.findOne({ orderId: data.orderId });
  if (!order) throw new Error("Order not found");

  // Additional validation can be added here

  const productionLog = new ProductionLog(data);
  return await productionLog.save();
};

const getAllProductionLogs = async () => {
  return await ProductionLog.find();
};

const getProductionLogById = async (logId) => {
  return await ProductionLog.findById(logId)
    .populate({
      path: "employeeId",
      model: "ProductionEmployee",
    })
    .populate({
      path: "orderId",
      model: "Order",
    });
};

const updateProductionLog = async (logId, updateData) => {
  return await ProductionLog.findByIdAndUpdate(logId, updateData, { new: true });
};

const deleteProductionLog = async (logId) => {
  return await ProductionLog.findByIdAndDelete(logId);
};

module.exports = {
  // Employee functions
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  // Production log functions
  createProductionLog,
  getAllProductionLogs,
  getProductionLogById,
  updateProductionLog,
  deleteProductionLog,
};
