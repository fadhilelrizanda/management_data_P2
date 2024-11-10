// models/userAnalytic.model.js

const mongoose = require("mongoose");

const userAnalyticSchema = new mongoose.Schema({
  analyticId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  userId: {
    type: Number,
    required: true,
    ref: "User",
  },
  eventType: {
    type: String,
    required: true,
    maxlength: 255,
  },
  eventDate: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const UserAnalytic = mongoose.model("UserAnalytic", userAnalyticSchema);

module.exports = UserAnalytic;
