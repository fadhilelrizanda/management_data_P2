// controllers/baseMeasurement.controller.js
const baseMeasurementService = require("../services/baseMeasurement.service");

const createBaseMeasurement = async (req, res) => {
  try {
    const savedBaseMeasurement = await baseMeasurementService.createBaseMeasurement(req.body);
    console.log("BaseMeasurement created successfully:", savedBaseMeasurement);
    res.status(201).json(savedBaseMeasurement);
  } catch (error) {
    console.error("Error creating BaseMeasurement:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllBaseMeasurements = async (req, res) => {
  try {
    const baseMeasurements = await baseMeasurementService.getAllBaseMeasurements();
    res.json(baseMeasurements);
  } catch (error) {
    console.error("Error fetching BaseMeasurements:", error);
    res.status(500).json({ message: error.message });
  }
};

const getBaseMeasurementById = async (req, res) => {
  try {
    const patternId = parseInt(req.params.id);
    const baseMeasurement = await baseMeasurementService.getBaseMeasurementById(patternId);

    if (!baseMeasurement) {
      return res.status(404).json({ message: "BaseMeasurement not found" });
    }

    res.json(baseMeasurement);
  } catch (error) {
    console.error("Error fetching BaseMeasurement:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateBaseMeasurement = async (req, res) => {
  try {
    const patternId = parseInt(req.params.id);
    const updatedBaseMeasurement = await baseMeasurementService.updateBaseMeasurement(patternId, req.body);
    if (!updatedBaseMeasurement) throw new Error("BaseMeasurement not found");
    res.json(updatedBaseMeasurement);
  } catch (error) {
    console.error("Error updating BaseMeasurement:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteBaseMeasurement = async (req, res) => {
  try {
    const patternId = parseInt(req.params.id);
    const deletedBaseMeasurement = await baseMeasurementService.deleteBaseMeasurement(patternId);
    if (!deletedBaseMeasurement) throw new Error("BaseMeasurement not found");

    console.log("BaseMeasurement deleted successfully:", deletedBaseMeasurement);
    res.json(deletedBaseMeasurement);
  } catch (error) {
    console.error("Error deleting BaseMeasurement:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createBaseMeasurement,
  getAllBaseMeasurements,
  getBaseMeasurementById,
  updateBaseMeasurement,
  deleteBaseMeasurement,
};
