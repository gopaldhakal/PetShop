const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@123";
const ADMIN_PASSWORD = "admin"; // Store in environment variables or config file for security

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password match the hardcoded credentials
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token (using a static user ID or admin ID)
  const token = jwt.sign(
    { id: "admin12345" }, // You can use a static ID since you're not using a database
    process.env.JWT_SECRET || "yourSecretKey", // Use environment variables for the secret key
    { expiresIn: "1h" }
  );

  // Send the token as a response
  res.json({ token });
});

module.exports = router;
