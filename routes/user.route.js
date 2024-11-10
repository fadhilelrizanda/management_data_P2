// routes/user.route.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// User CRUD Routes
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Address and Measurement Routes
router.post("/:id/addresses", userController.addAddress);
router.post("/:id/measurements", userController.addMeasurement);

module.exports = router;
