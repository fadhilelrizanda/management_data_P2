// services/user.service.js
const User = require("../models/user.model");

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (userId) => {
  return await User.findOne({ userId });
};

const updateUser = async (userId, updateData) => {
  return await User.findOneAndUpdate({ userId }, updateData, { new: true });
};

const deleteUser = async (userId) => {
  return await User.findOneAndDelete({ userId });
};

const addAddress = async (userId, addressData) => {
  const user = await User.findOne({ userId });
  if (!user) return null;
  user.addresses.push(addressData);
  return await user.save();
};

const addMeasurement = async (userId, measurementData) => {
  const user = await User.findOne({ userId });
  if (!user) return null;
  user.measurements.push(measurementData);
  return await user.save();
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addAddress,
  addMeasurement,
};
