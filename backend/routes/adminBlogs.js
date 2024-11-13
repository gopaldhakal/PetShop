const express = require("express");
const Blog = require("../models/Blog"); // Import the Blog model
const protect = require("../middleware/auth"); // Import authentication middleware
const router = express.Router();

// Create a Blog
router.post("/", protect, async (req, res) => {
  const { title, imageUrl, description } = req.body;

  try {
    const blog = new Blog({
      title,
      imageUrl,
      description,
    });

    // Save the new blog post
    await blog.save();
    res.status(201).json(blog); // Return the created blog post
  } catch (error) {
    res.status(400).json({ message: "Error creating blog post", error });
  }
});

// Get All Blogs
router.get("/", protect, async (req, res) => {
  try {
    const blogs = await Blog.find(); // Find all blog posts
    res.json(blogs); // Return the blog posts
  } catch (error) {
    res.status(400).json({ message: "Error fetching blogs", error });
  }
});

// Update a Blog
router.put("/:id", protect, async (req, res) => {
  const { title, imageUrl, description } = req.body;

  try {
    const blog = await Blog.findById(req.params.id); // Find the blog by ID
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update the blog fields
    blog.title = title || blog.title;
    blog.imageUrl = imageUrl || blog.imageUrl;
    blog.description = description || blog.description;

    await blog.save(); // Save the updated blog post
    res.json(blog); // Return the updated blog post
  } catch (error) {
    res.status(400).json({ message: "Error updating blog post", error });
  }
});

// Delete a Blog
router.delete("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id); // Find the blog by ID
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.remove(); // Remove the blog post from the database
    res.json({ message: "Blog post removed" }); // Return success message
  } catch (error) {
    res.status(400).json({ message: "Error deleting blog post", error });
  }
});

module.exports = router; // Export the routes
