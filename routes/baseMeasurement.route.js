// routes/baseMeasurement.route.js
const express = require("express");
const router = express.Router();
const baseMeasurementController = require("../controllers/baseMeasurement.controller");

// BaseMeasurement CRUD Routes
router.post("/", baseMeasurementController.createBaseMeasurement);
router.get("/", baseMeasurementController.getAllBaseMeasurements);
router.get("/:id", baseMeasurementController.getBaseMeasurementById);
router.put("/:id", baseMeasurementController.updateBaseMeasurement);
router.delete("/:id", baseMeasurementController.deleteBaseMeasurement);

module.exports = router;
