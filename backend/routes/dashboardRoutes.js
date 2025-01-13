const express = require("express");
const router = express.Router();

// Import your models here
const Product = require("../models/Product");
const Blog = require("../models/Blog");
const Order = require("../models/Order");

// Define the GET route for the dashboard data
router.get("/", async (req, res) => {
  try {
    const pendingOrdersCount = await Order.countDocuments({ completed: false });
    // Fetch the total count of products
    const totalProducts = await Product.countDocuments();

    // Fetch the total count of blog posts (using Blog model)
    const totalBlogPosts = await Blog.countDocuments();

    // Fetch the three most recent blog posts
    const recentBlogPosts = await Blog.find()
      .sort({ createdAt: -1 }) // Sort by the most recent first
      .limit(3) // Limit to 3 most recent posts
      .select("title createdAt description"); // Select only title, createdAt, and description

    // Send the data back as a JSON response
    res.json({
      totalProducts,
      totalBlogPosts,
      recentBlogPosts,
      pendingOrdersCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
