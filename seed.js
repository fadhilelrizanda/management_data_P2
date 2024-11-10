// seed.js
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user.model"); // Adjust path to your User model

const mongoString = "mongodb+srv://fadhilelrizanda:A0Ve2IeGyU8KYJ2I@cluster0.ekexg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => console.error("MongoDB connection error:", error));
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

// Predefined data for seeding
const users = [
    {
      name: "Ahmad Suryanto",
      phone_number: "081234567890",
      email: "ahmadsuryanto@example.com",
      creation_date: new Date(),
      password_hash: "password",
    },
    {
      name: "Siti Nurhaliza",
      phone_number: "081398765432",
      email: "sitihaliza@example.com",
      creation_date: new Date(),
      password_hash: "password",
    },
    {
      name: "Budi Santoso",
      phone_number: "081123456789",
      email: "budisantoso@example.com",
      creation_date: new Date(),
      password_hash: "password",
    },
    {
      name: "Rina Kurniasari",
      phone_number: "082255667788",
      email: "rinakurniasari@example.com",
      creation_date: new Date(),
      password_hash: "password",
    },
    {
      name: "Hendra Wijaya",
      phone_number: "085266778899",
      email: "hendrawijaya@example.com",
      creation_date: new Date(),
      password_hash: "password",
    },
    {
      name: "Lilis Rahayu",
      phone_number: "085399887766",
      email: "lilisrahayu@example.com",
      creation_date: new Date(),
      password_hash: "password",
    },
    {
      name: "Agus Pratama",
      phone_number: "082133445566",
      email: "aguspratama@example.com",
      creation_date: new Date(),
      password_hash: "password",
    },
    {
      name: "Sri Wahyuni",
      phone_number: "081922334455",
      email: "sriwahyuni@example.com",
      creation_date: new Date(),
      password_hash: "password",
    },
    {
      name: "Yanto Sudirman",
      phone_number: "081233445566",
      email: "yantosudirman@example.com",
      creation_date: new Date(),
      password_hash: "password",
    },
    {
      name: "Dewi Handayani",
      phone_number: "081788997766",
      email: "dewihandayani@example.com",
      creation_date: new Date(),
      password_hash: "password",
    },
  ];  


// Function to seed data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    console.log("Cleared existing data.");

    // Insert new data
    await User.insertMany(users);
    console.log("Database seeded successfully!");

    mongoose.connection.close(); // Close connection after seeding
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
