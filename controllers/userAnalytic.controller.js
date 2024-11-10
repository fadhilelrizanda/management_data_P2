// controllers/userAnalytic.controller.js

const userAnalyticService = require("../services/userAnalytic.service");

const createUserAnalytic = async (req, res) => {
  try {
    const savedAnalytic = await userAnalyticService.createUserAnalytic(req.body);
    res.status(201).json(savedAnalytic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserAnalytics = async (req, res) => {
  try {
    const filter = req.query || {};
    const analytics = await userAnalyticService.getUserAnalytics(filter);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserAnalyticById = async (req, res) => {
  try {
    const analyticId = req.params.id;
    const analytic = await userAnalyticService.getUserAnalyticById(analyticId);

    if (!analytic) {
      return res.status(404).json({ message: "User analytic event not found" });
    }

    res.json(analytic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUserAnalytic,
  getUserAnalytics,
  getUserAnalyticById,
};
