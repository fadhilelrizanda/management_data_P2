// services/userAnalytic.service.js

const UserAnalytic = require("../models/userAnalytic.model");
const User = require("../models/user.model");

const createUserAnalytic = async (data) => {
  const user = await User.findOne({ userId: data.userId });
  if (!user) throw new Error("User not found");

  const userAnalytic = new UserAnalytic(data);
  return await userAnalytic.save();
};

const getUserAnalytics = async (filter = {}) => {
  return await UserAnalytic.find(filter);
};

const getUserAnalyticById = async (analyticId) => {
  return await UserAnalytic.findById(analyticId).populate({
    path: "userId",
    model: "User",
  });
};

module.exports = {
  createUserAnalytic,
  getUserAnalytics,
  getUserAnalyticById,
};
