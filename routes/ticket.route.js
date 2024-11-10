// routes/ticket.route.js

const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");

// Ticket CRUD Routes
router.post("/", ticketController.createTicket);
router.get("/", ticketController.getAllTickets);
router.get("/:id", ticketController.getTicketById);
router.put("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);

module.exports = router;
