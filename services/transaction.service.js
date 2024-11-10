// services/transaction.service.js

const Transaction = require("../models/transaction.model");
const Order = require("../models/order.model");

const createTransaction = async (data) => {
  // Validate order
  const order = await Order.findOne({ orderId: data.orderId });
  if (!order) throw new Error("Order not found");

  const transaction = new Transaction(data);
  return await transaction.save();
};

const getAllTransactions = async () => {
  return await Transaction.find();
};

const getTransactionById = async (transactionId) => {
  return await Transaction.findOne({ transactionId })
    .populate({
      path: "orderId",
      model: "Order",
    });
};

const updateTransaction = async (transactionId, updateData) => {
  return await Transaction.findOneAndUpdate({ transactionId }, updateData, { new: true });
};

const deleteTransaction = async (transactionId) => {
  return await Transaction.findOneAndDelete({ transactionId });
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
