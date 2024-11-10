// controllers/production.controller.js

const productionService = require("../services/production.service");

// Production Employee Controllers

const createEmployee = async (req, res) => {
  try {
    const savedEmployee = await productionService.createEmployee(req.body);
    console.log("Employee created successfully:", savedEmployee);
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await productionService.getAllEmployees();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id);
    const employee = await productionService.getEmployeeById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id);
    const updatedEmployee = await productionService.updateEmployee(employeeId, req.body);
    if (!updatedEmployee) throw new Error("Employee not found");
    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id);
    const deletedEmployee = await productionService.deleteEmployee(employeeId);
    if (!deletedEmployee) throw new Error("Employee not found");

    console.log("Employee deleted successfully:", deletedEmployee);
    res.json(deletedEmployee);
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(400).json({ message: error.message });
  }
};

// Production Log Controllers

const createProductionLog = async (req, res) => {
  try {
    const savedLog = await productionService.createProductionLog(req.body);
    console.log("Production log created successfully:", savedLog);
    res.status(201).json(savedLog);
  } catch (error) {
    console.error("Error creating production log:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllProductionLogs = async (req, res) => {
  try {
    const logs = await productionService.getAllProductionLogs();
    res.json(logs);
  } catch (error) {
    console.error("Error fetching production logs:", error);
    res.status(500).json({ message: error.message });
  }
};

const getProductionLogById = async (req, res) => {
  try {
    const logId = req.params.id;
    const log = await productionService.getProductionLogById(logId);

    if (!log) {
      return res.status(404).json({ message: "Production log not found" });
    }

    res.json(log);
  } catch (error) {
    console.error("Error fetching production log:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateProductionLog = async (req, res) => {
  try {
    const logId = req.params.id;
    const updatedLog = await productionService.updateProductionLog(logId, req.body);
    if (!updatedLog) throw new Error("Production log not found");
    res.json(updatedLog);
  } catch (error) {
    console.error("Error updating production log:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteProductionLog = async (req, res) => {
  try {
    const logId = req.params.id;
    const deletedLog = await productionService.deleteProductionLog(logId);
    if (!deletedLog) throw new Error("Production log not found");

    console.log("Production log deleted successfully:", deletedLog);
    res.json(deletedLog);
  } catch (error) {
    console.error("Error deleting production log:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  // Employee controllers
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  // Production log controllers
  createProductionLog,
  getAllProductionLogs,
  getProductionLogById,
  updateProductionLog,
  deleteProductionLog,
};
