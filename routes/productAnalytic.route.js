// routes/productAnalytic.route.js

const express = require("express");
const router = express.Router();
const productAnalyticController = require("../controllers/productAnalytic.controller");

// Create Product Analytic Event
router.post("/", productAnalyticController.createProductAnalytic);

// Get Product Analytics
router.get("/", productAnalyticController.getProductAnalytics);

// Get Product Analytic Event by ID
router.get("/:id", productAnalyticController.getProductAnalyticById);

module.exports = router;
