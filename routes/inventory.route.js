// routes/inventory.route.js
const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory.controller");

// Inventory CRUD Routes
router.post("/", inventoryController.createInventoryItem);
router.get("/", inventoryController.getAllInventoryItems);
router.get("/:id", inventoryController.getInventoryItemById);
router.put("/:id", inventoryController.updateInventoryItem);
router.delete("/:id", inventoryController.deleteInventoryItem);

// Adjust Inventory Quantity
router.post("/:id/adjust", inventoryController.adjustInventoryQuantity);

// Get Inventory Logs
router.get("/:id/logs", inventoryController.getInventoryLogs);

module.exports = router;
