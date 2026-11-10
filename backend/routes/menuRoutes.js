const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new menu item
router.post("/", async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    const savedMenu = await newMenu.save();

    res.status(201).json(savedMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;