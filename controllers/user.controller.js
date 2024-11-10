// controllers/user.controller.js
const userService = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    const savedUser = await userService.createUser(req.body);
    console.log("User created successfully:", savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = await userService.updateUser(userId, req.body);
    if (!updatedUser) throw new Error("User not found");
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const deletedUser = await userService.deleteUser(userId);
    if (!deletedUser) throw new Error("User not found");

    console.log("User deleted successfully:", deletedUser);
    res.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).json({ message: error.message });
  }
};

const addAddress = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const addressData = req.body;
    const updatedUser = await userService.addAddress(userId, addressData);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(400).json({ message: error.message });
  }
};

const addMeasurement = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const measurementData = req.body;
    const updatedUser = await userService.addMeasurement(userId, measurementData);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error adding measurement:", error);
    res.status(400).json({ message: error.message });
  }
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
