// controllers/order.controller.js

const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
  try {
    const savedOrder = await orderService.createOrder(req.body);
    console.log("Order created successfully:", savedOrder);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const updatedOrder = await orderService.updateOrder(orderId, req.body);
    if (!updatedOrder) throw new Error("Order not found");
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const deletedOrder = await orderService.deleteOrder(orderId);
    if (!deletedOrder) throw new Error("Order not found");

    console.log("Order deleted successfully:", deletedOrder);
    res.json(deletedOrder);
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
