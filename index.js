// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/user.route");
const baseMeasurementRouter = require("./routes/baseMeasurement.route"); // Import the new router
const inventoryRouter = require("./routes/inventory.route"); // Import inventory router
const productRouter = require("./routes/product.route"); // Import product router
const orderRouter = require("./routes/order.route");
const transactionRouter = require("./routes/transaction.route");
const ticketRouter = require("./routes/ticket.route");
const productionRouter = require("./routes/production.route");
const userAnalyticRouter = require("./routes/userAnalytic.route"); // Import userAnalytic router
const productAnalyticRouter = require("./routes/productAnalytic.route"); 

const mongoString = "mongodb+srv://fadhilelrizanda:A0Ve2IeGyU8KYJ2I@cluster0.ekexg.mongodb.net/if5101?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

const database = mongoose.connection;

database.on("error", (error) => console.error("Database connection error:", error));
database.once("connected", () => console.log("Database Connected!"));

const app = express();

app.use(cors());
app.use(express.json());

// Base URL for user and baseMeasurement routes
app.use("/users", userRouter);
app.use("/baseMeasurements", baseMeasurementRouter); // Add the new route
app.use("/inventory", inventoryRouter); // Add inventory routes
app.use("/products", productRouter); // Add product routes
app.use("/orders", orderRouter);
app.use("/transactions", transactionRouter);
app.use("/tickets", ticketRouter);
app.use("/production", productionRouter); // Add production routes
app.use("/userAnalytics", userAnalyticRouter); // Add userAnalytic routes
app.use("/productAnalytics", productAnalyticRouter); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
