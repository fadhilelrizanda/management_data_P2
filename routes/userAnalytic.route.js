// routes/userAnalytic.route.js

const express = require("express");
const router = express.Router();
const userAnalyticController = require("../controllers/userAnalytic.controller");

// Create User Analytic Event
router.post("/", userAnalyticController.createUserAnalytic);

// Get User Analytics
router.get("/", userAnalyticController.getUserAnalytics);

// Get User Analytic Event by ID
router.get("/:id", userAnalyticController.getUserAnalyticById);

module.exports = router;
