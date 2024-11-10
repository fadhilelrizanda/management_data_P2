// routes/product.route.js

const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// Product CRUD Routes
router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// Add Material Cost to Product
router.post("/:id/materialCosts", productController.addMaterialCost);

// Remove Material Cost from Product
router.delete("/:id/materialCosts/:inventoryId", productController.removeMaterialCost);

module.exports = router;
