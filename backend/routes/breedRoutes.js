const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Breed = require("../models/Breed");

// Create a breed
router.post("/", auth, async (req, res) => {
  const { name, imageUrl, description } = req.body;

  try {
    const newBreed = new Breed({ name, imageUrl, description });
    await newBreed.save();
    res.status(201).json(newBreed);
  } catch (error) {
    res.status(500).json({ msg: "Error creating breed" });
  }
});

// Get all breeds
router.get("/", async (req, res) => {
  try {
    const breeds = await Breed.find();

    res.json(breeds);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching breeds" });
  }
});

// Update breed
router.put("/:id", auth, async (req, res) => {
  const { name, imageUrl, description } = req.body;

  try {
    const breed = await Breed.findByIdAndUpdate(
      req.params.id,
      { name, imageUrl, description },
      { new: true }
    );
    res.json(breed);
  } catch (error) {
    res.status(500).json({ msg: "Error updating breed" });
  }
});

// Delete breed
router.delete("/:id", auth, async (req, res) => {
  try {
    await Breed.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Breed deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting breed" });
  }
});

router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const breeds = await Breed.find({ name: { $regex: query, $options: "i" } }); // case-insensitive search
    res.json(breeds);
  } catch (error) {
    res.status(500).json({ msg: "Error searching breeds" });
  }
});

// backend/routes/breedRoutes.js
// Get breed by name (with hyphen-to-space handling)
router.get("/:name", async (req, res) => {
  const breedName = req.params.name.replace(/-/g, " "); // Replace hyphens with spaces
  try {
    const breed = await Breed.findOne({
      name: { $regex: new RegExp("^" + breedName + "$", "i") },
    }); // Case-insensitive regex query
    if (!breed) {
      return res.status(404).json({ msg: "Breed not found" });
    }
    res.json(breed);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching breed details" });
  }
});

module.exports = router;
