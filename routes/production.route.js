// routes/production.route.js

const express = require("express");
const router = express.Router();
const productionController = require("../controllers/production.controller");

// Production Employee Routes

// Create Employee
router.post("/employees", productionController.createEmployee);

// Get All Employees
router.get("/employees", productionController.getAllEmployees);

// Get Employee by ID
router.get("/employees/:id", productionController.getEmployeeById);

// Update Employee
router.put("/employees/:id", productionController.updateEmployee);

// Delete Employee
router.delete("/employees/:id", productionController.deleteEmployee);

// Production Log Routes

// Create Production Log
router.post("/logs", productionController.createProductionLog);

// Get All Production Logs
router.get("/logs", productionController.getAllProductionLogs);

// Get Production Log by ID
router.get("/logs/:id", productionController.getProductionLogById);

// Update Production Log
router.put("/logs/:id", productionController.updateProductionLog);

// Delete Production Log
router.delete("/logs/:id", productionController.deleteProductionLog);

module.exports = router;
