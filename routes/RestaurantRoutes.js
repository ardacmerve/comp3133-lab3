const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// 1. Get all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Get restaurants by cuisine
router.get("/cuisine/:cuisine", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ cuisines: req.params.cuisine });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Get selected columns with sorting
router.get("/", async (req, res) => {
  try {
    let sortOption = req.query.sortBy === "ASC" ? 1 : -1;
    const restaurants = await Restaurant.find()
      .select("restaurant_id name cuisines city")
      .sort({ restaurant_id: sortOption });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Get restaurants where cuisine is "Delicatessen" and city is not Brooklyn
router.get("/Delicatessen", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      cuisines: "Delicatessen",
      city: { $ne: "Brooklyn" }
    })
      .select("name cuisines city -_id")
      .sort({ name: 1 });

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
