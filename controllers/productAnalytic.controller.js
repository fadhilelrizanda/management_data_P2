// controllers/productAnalytic.controller.js

const productAnalyticService = require("../services/productAnalytic.service");

const createProductAnalytic = async (req, res) => {
  try {
    const savedAnalytic = await productAnalyticService.createProductAnalytic(req.body);
    res.status(201).json(savedAnalytic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProductAnalytics = async (req, res) => {
  try {
    const filter = req.query || {};
    const analytics = await productAnalyticService.getProductAnalytics(filter);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductAnalyticById = async (req, res) => {
  try {
    const analyticId = req.params.id;
    const analytic = await productAnalyticService.getProductAnalyticById(analyticId);

    if (!analytic) {
      return res.status(404).json({ message: "Product analytic event not found" });
    }

    res.json(analytic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProductAnalytic,
  getProductAnalytics,
  getProductAnalyticById,
};
