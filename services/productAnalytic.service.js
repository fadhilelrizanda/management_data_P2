// services/productAnalytic.service.js

const ProductAnalytic = require("../models/productAnalytic.model");
const Product = require("../models/product.model");

const createProductAnalytic = async (data) => {
  const product = await Product.findOne({ productId: data.productId });
  if (!product) throw new Error("Product not found");

  const productAnalytic = new ProductAnalytic(data);
  return await productAnalytic.save();
};

const getProductAnalytics = async (filter = {}) => {
  return await ProductAnalytic.find(filter);
};

const getProductAnalyticById = async (analyticId) => {
  return await ProductAnalytic.findById(analyticId).populate({
    path: "productId",
    model: "Product",
  });
};

module.exports = {
  createProductAnalytic,
  getProductAnalytics,
  getProductAnalyticById,
};
