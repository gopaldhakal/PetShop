const express = require("express");
const router = express.Router();
const multer = require("multer");
const Order = require("../models/Order");
const path = require("path");

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Ensure the uploads directory exists
const fs = require("fs");
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Route to handle form submission
router.post("/", upload.single("paymentScreenshot"), async (req, res) => {
  const { name, contactNumber, deliveryLocation, cart } = req.body;
  const paymentScreenshot = req.file.path;

  try {
    const newOrder = new Order({
      name,
      contactNumber,
      deliveryLocation,
      paymentScreenshot,
      cart: JSON.parse(cart), // Parse the cart JSON string to an array
    });

    await newOrder.save();
    res.status(201).json({ message: "Order submitted successfully!" });
  } catch (error) {
    console.error("Error submitting order:", error);
    res.status(500).json({ message: "Error submitting order", error });
  }
});

module.exports = router;
