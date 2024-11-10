// services/order.service.js

const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");

const createOrder = async (orderData) => {
  // Validate user
  const user = await User.findOne({ userId: orderData.userId });
  if (!user) throw new Error("User not found");

  // Validate products and measurements
  for (const item of orderData.items) {
    const product = await Product.findOne({ productId: item.productId });
    if (!product) throw new Error(`Product with ID ${item.productId} not found`);

    // Additional validation can be added here
  }

  const order = new Order(orderData);
  return await order.save();
};

const getAllOrders = async () => {
  return await Order.find();
};

const getOrderById = async (orderId) => {
  return await Order.findOne({ orderId })
    .populate({
      path: "userId",
      model: "User",
    })
    .populate({
      path: "items.productId",
      model: "Product",
    })
    .populate({
      path: "items.userMeasurement.patternId",
      model: "BaseMeasurement",
    });
};

const updateOrder = async (orderId, updateData) => {
  return await Order.findOneAndUpdate({ orderId }, updateData, { new: true });
};

const deleteOrder = async (orderId) => {
  return await Order.findOneAndDelete({ orderId });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
