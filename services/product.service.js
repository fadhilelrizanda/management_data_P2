// services/product.service.js

const Product = require("../models/product.model");
const Inventory = require("../models/inventory.model");

const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

const getAllProducts = async () => {
  return await Product.find();
};

const getProductById = async (productId) => {
  return await Product.findOne({ productId })
    .populate({
      path: "measurements.baseMeasurementId",
      model: "BaseMeasurement",
    })
    .populate({
      path: "materialCosts.inventoryId",
      model: "Inventory",
    });
};

const updateProduct = async (productId, updateData) => {
  return await Product.findOneAndUpdate({ productId }, updateData, { new: true });
};

const deleteProduct = async (productId) => {
  return await Product.findOneAndDelete({ productId });
};

const addMaterialCost = async (productId, materialCostData) => {
  const product = await Product.findOne({ productId });
  if (!product) throw new Error("Product not found");

  // Validate Inventory Item
  const inventoryItem = await Inventory.findOne({ inventoryId: materialCostData.inventoryId });
  if (!inventoryItem) throw new Error("Inventory item not found");

  // Validate Quantity
  if (materialCostData.quantity <= 0) throw new Error("Quantity must be greater than zero");

  product.materialCosts.push(materialCostData);
  return await product.save();
};

const removeMaterialCost = async (productId, inventoryId) => {
  const product = await Product.findOne({ productId });
  if (!product) throw new Error("Product not found");

  product.materialCosts = product.materialCosts.filter(
    (materialCost) => materialCost.inventoryId !== inventoryId
  );
  return await product.save();
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
