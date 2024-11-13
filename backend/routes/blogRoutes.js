const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Blog = require("../models/Blog");

// Create a blog
router.post("/", auth, async (req, res) => {
  const { title, imageUrl, description, content } = req.body; // Include content

  try {
    // Ensure content is passed as it is required in the schema
    if (!title || !description || !content || !imageUrl) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newBlog = new Blog({ title, imageUrl, description, content });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error); // Log detailed error
    res.status(500).json({ msg: "Error creating blog" });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ msg: "Error fetching blogs" });
  }
});
// router.get("/title/:title", async (req, res) => {
//   const { title } = req.params;
//   try {
//     const formattedTitle = title.replace(/-/g, " ");
//     const blog = await Blog.findOne({
//       title: new RegExp(`^${formattedTitle}$`, "i"),
//     });
//     if (!blog) return res.status(404).json({ msg: "Blog not found" });
//     res.json(blog);
//   } catch (error) {
//     res.status(500).json({ msg: "Error fetching blog" });
//   }
// });
// GET blog by formatted title
router.get("/title/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const formattedTitle = title.replace(/-/g, " "); // Replace hyphens with spaces
    const blog = await Blog.findOne({
      title: new RegExp(`^${formattedTitle}$`, "i"), // Case-insensitive
    });
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching blog" });
  }
});

// Update blog
router.put("/:id", auth, async (req, res) => {
  const { title, imageUrl, description, content } = req.body; // Include content

  try {
    if (!title || !description || !content || !imageUrl) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, imageUrl, description, content },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ msg: "Error updating blog" });
  }
});

// Delete blog
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    res.status(200).json({ msg: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ msg: "Error deleting blog" });
  }
});

router.get("/:breedName", async (req, res) => {
  const { breedName } = req.params;

  try {
    const breed = await Breed.findOne({ name: breedName });
    if (!breed) {
      return res.status(404).json({ msg: "Breed not found" });
    }
    res.json(breed);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching breed details" });
  }
});
module.exports = router;
