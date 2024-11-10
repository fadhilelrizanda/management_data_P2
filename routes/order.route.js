// routes/order.route.js

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Order CRUD Routes
router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
