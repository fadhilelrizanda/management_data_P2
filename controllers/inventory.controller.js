// controllers/inventory.controller.js
const inventoryService = require("../services/inventory.service");

const createInventoryItem = async (req, res) => {
  try {
    const savedItem = await inventoryService.createInventoryItem(req.body);
    console.log("Inventory item created successfully:", savedItem);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating inventory item:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllInventoryItems = async (req, res) => {
  try {
    const items = await inventoryService.getAllInventoryItems();
    res.json(items);
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    res.status(500).json({ message: error.message });
  }
};

const getInventoryItemById = async (req, res) => {
  try {
    const inventoryId = parseInt(req.params.id);
    const item = await inventoryService.getInventoryItemById(inventoryId);

    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error fetching inventory item:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateInventoryItem = async (req, res) => {
  try {
    const inventoryId = parseInt(req.params.id);
    const updatedItem = await inventoryService.updateInventoryItem(inventoryId, req.body);
    if (!updatedItem) throw new Error("Inventory item not found");
    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteInventoryItem = async (req, res) => {
  try {
    const inventoryId = parseInt(req.params.id);
    const deletedItem = await inventoryService.deleteInventoryItem(inventoryId);
    if (!deletedItem) throw new Error("Inventory item not found");

    console.log("Inventory item deleted successfully:", deletedItem);
    res.json(deletedItem);
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    res.status(400).json({ message: error.message });
  }
};

const adjustInventoryQuantity = async (req, res) => {
  try {
    const inventoryId = parseInt(req.params.id);
    const adjustmentData = req.body;
    const updatedItem = await inventoryService.adjustInventoryQuantity(inventoryId, adjustmentData);
    res.json(updatedItem);
  } catch (error) {
    console.error("Error adjusting inventory quantity:", error);
    res.status(400).json({ message: error.message });
  }
};

const getInventoryLogs = async (req, res) => {
  try {
    const inventoryId = parseInt(req.params.id);
    const logs = await inventoryService.getInventoryLogs(inventoryId);
    res.json(logs);
  } catch (error) {
    console.error("Error fetching inventory logs:", error);
    res.status(500).json({ message: error.message });
  }
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
