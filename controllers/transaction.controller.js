// controllers/transaction.controller.js

const transactionService = require("../services/transaction.service");

const createTransaction = async (req, res) => {
  try {
    const savedTransaction = await transactionService.createTransaction(req.body);
    console.log("Transaction created successfully:", savedTransaction);
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const transactionId = parseInt(req.params.id);
    const transaction = await transactionService.getTransactionById(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transactionId = parseInt(req.params.id);
    const updatedTransaction = await transactionService.updateTransaction(transactionId, req.body);
    if (!updatedTransaction) throw new Error("Transaction not found");
    res.json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transactionId = parseInt(req.params.id);
    const deletedTransaction = await transactionService.deleteTransaction(transactionId);
    if (!deletedTransaction) throw new Error("Transaction not found");

    console.log("Transaction deleted successfully:", deletedTransaction);
    res.json(deletedTransaction);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
