// controllers/product.controller.js

const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const savedProduct = await productService.createProduct(req.body);
    console.log("Product created successfully:", savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updatedProduct = await productService.updateProduct(productId, req.body);
    if (!updatedProduct) throw new Error("Product not found");
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const deletedProduct = await productService.deleteProduct(productId);
    if (!deletedProduct) throw new Error("Product not found");

    console.log("Product deleted successfully:", deletedProduct);
    res.json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(400).json({ message: error.message });
  }
};

const addMaterialCost = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const materialCostData = req.body;
    const updatedProduct = await productService.addMaterialCost(productId, materialCostData);
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error adding material cost:", error);
    res.status(400).json({ message: error.message });
  }
};

const removeMaterialCost = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const inventoryId = parseInt(req.params.inventoryId);
    const updatedProduct = await productService.removeMaterialCost(productId, inventoryId);
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error removing material cost:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addMaterialCost,
  removeMaterialCost,
};
