// services/baseMeasurement.service.js
const BaseMeasurement = require("../models/baseMeasurement.model");

const createBaseMeasurement = async (data) => {
  const baseMeasurement = new BaseMeasurement(data);
  return await baseMeasurement.save();
};

const getAllBaseMeasurements = async () => {
  return await BaseMeasurement.find();
};

const getBaseMeasurementById = async (patternId) => {
  return await BaseMeasurement.findOne({ patternId });
};

const updateBaseMeasurement = async (patternId, updateData) => {
  return await BaseMeasurement.findOneAndUpdate({ patternId }, updateData, { new: true });
};

const deleteBaseMeasurement = async (patternId) => {
  return await BaseMeasurement.findOneAndDelete({ patternId });
};

module.exports = {
  createBaseMeasurement,
  getAllBaseMeasurements,
  getBaseMeasurementById,
  updateBaseMeasurement,
  deleteBaseMeasurement,
};
