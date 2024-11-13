const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Product = require("../models/Product");

// Create a product
router.post("/", auth, async (req, res) => {
  const { name, price, imageUrl, description } = req.body;

  try {
    const newProduct = new Product({ name, price, imageUrl, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ msg: "Error creating product" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching products" });
  }
});

// Update product
router.put("/:id", auth, async (req, res) => {
  const { name, price, imageUrl, description } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, imageUrl, description },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: "Error updating product" });
  }
});

// Delete product
router.delete("/:id", auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Product deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting product" });
  }
});

module.exports = router;
