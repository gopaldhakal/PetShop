// backend/controllers/breedController.js

const Breed = require("../models/Breed");

// @desc    Get all breeds
// @route   GET /api/breeds
// @access  Public
const getBreeds = async (req, res) => {
  try {
    const breeds = await Breed.find();
    res.status(200).json(breeds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new breed
// @route   POST /api/breeds
// @access  Private (this might need authentication for production)
const createBreed = async (req, res) => {
  const { name, imageUrl } = req.body;

  try {
    const newBreed = new Breed({ name, imageUrl });
    await newBreed.save();
    res.status(201).json(newBreed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search breeds by name
// @route   GET /api/breeds/search
// @access  Public
const searchBreeds = async (req, res) => {
  const { query } = req.query;

  try {
    const breeds = await Breed.find({ name: { $regex: query, $options: "i" } }); // case-insensitive search
    res.status(200).json(breeds);
  } catch (error) {
    res.status(500).json({ message: "Error searching breeds" });
  }
};

module.exports = {
  getBreeds,
  createBreed,
  searchBreeds,
};
