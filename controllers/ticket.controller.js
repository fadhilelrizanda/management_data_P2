// controllers/ticket.controller.js

const ticketService = require("../services/ticket.service");

const createTicket = async (req, res) => {
  try {
    const savedTicket = await ticketService.createTicket(req.body);
    console.log("Ticket created successfully:", savedTicket);
    res.status(201).json(savedTicket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = await ticketService.getTicketById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const updatedTicket = await ticketService.updateTicket(ticketId, req.body);
    if (!updatedTicket) throw new Error("Ticket not found");
    res.json(updatedTicket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const deletedTicket = await ticketService.deleteTicket(ticketId);
    if (!deletedTicket) throw new Error("Ticket not found");

    console.log("Ticket deleted successfully:", deletedTicket);
    res.json(deletedTicket);
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
