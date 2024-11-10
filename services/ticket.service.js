// services/ticket.service.js

const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");

const createTicket = async (data) => {
  // Validate user
  const user = await User.findOne({ userId: data.userId });
  if (!user) throw new Error("User not found");

  // If orderId is provided, validate order
  if (data.orderId) {
    const order = await Order.findOne({ orderId: data.orderId });
    if (!order) throw new Error("Order not found");
  }

  const ticket = new Ticket(data);
  return await ticket.save();
};

const getAllTickets = async () => {
  return await Ticket.find();
};

const getTicketById = async (ticketId) => {
  return await Ticket.findOne({ ticketId })
    .populate({
      path: "userId",
      model: "User",
    })
    .populate({
      path: "orderId",
      model: "Order",
    });
};

const updateTicket = async (ticketId, updateData) => {
  return await Ticket.findOneAndUpdate({ ticketId }, updateData, { new: true });
};

const deleteTicket = async (ticketId) => {
  return await Ticket.findOneAndDelete({ ticketId });
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
