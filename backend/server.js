const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Menu routes
const menuRoutes = require("./routes/menuRoutes");
app.use("/api/menu", menuRoutes);

app.get("/add-test-coffee", async (req, res) => {
  try {
    const Menu = require("./models/Menu");

    const coffee = await Menu.create({
      name: "Espresso",
      description: "Freshly brewed espresso coffee",
      price: 80,
      category: "Coffee",
      image: "",
      available: true
    });

    res.json(coffee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Smile Cafe Backend is running!");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5001;

mongoose.connect("mongodb://127.0.0.1:27017/Smile_cafe")
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Smile Cafe server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });