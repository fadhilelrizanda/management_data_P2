// services/inventory.service.js
const Inventory = require("../models/inventory.model");
const InventoryLog = require("../models/inventoryLog.model");

const createInventoryItem = async (data) => {
  const inventoryItem = new Inventory(data);
  return await inventoryItem.save();
};

const getAllInventoryItems = async () => {
  return await Inventory.find();
};

const getInventoryItemById = async (inventoryId) => {
  return await Inventory.findOne({ inventoryId });
};

const updateInventoryItem = async (inventoryId, updateData) => {
  return await Inventory.findOneAndUpdate({ inventoryId }, updateData, { new: true });
};

const deleteInventoryItem = async (inventoryId) => {
  return await Inventory.findOneAndDelete({ inventoryId });
};

const adjustInventoryQuantity = async (inventoryId, adjustmentData) => {
  const { quantity, transactionType, orderId, itemNumber, description } = adjustmentData;

  if (!["IN", "OUT"].includes(transactionType)) {
    throw new Error("Invalid transaction type. Must be 'IN' or 'OUT'.");
  }

  const inventoryItem = await Inventory.findOne({ inventoryId });
  if (!inventoryItem) {
    throw new Error("Inventory item not found");
  }

  let newQuantity = inventoryItem.quantity;

  if (transactionType === "IN") {
    newQuantity += quantity;
  } else if (transactionType === "OUT") {
    newQuantity -= quantity;
    if (newQuantity < 0) {
      throw new Error("Insufficient inventory quantity");
    }
  }

  // Update inventory quantity
  inventoryItem.quantity = newQuantity;
  await inventoryItem.save();

  // Create inventory log
  const inventoryLog = new InventoryLog({
    inventoryId,
    orderId,
    itemNumber,
    quantity,
    transactionType,
    description,
  });
  await inventoryLog.save();

  return inventoryItem;
};

const getInventoryLogs = async (inventoryId) => {
  return await InventoryLog.find({ inventoryId }).sort({ date: -1 });
};

module.exports = {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
  adjustInventoryQuantity,
  getInventoryLogs,
};
