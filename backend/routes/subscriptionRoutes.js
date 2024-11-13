const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");

// Route to handle new subscriptions
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    // Validate the email before saving
    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    // Save the subscription to the database
    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    res.status(201).json({ msg: "Subscription successful" });
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).json({ msg: "Error subscribing" });
  }
});

router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ msg: "Error fetching subscriptions" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const subscription = await Subscription.findByIdAndDelete(id);
    if (!subscription)
      return res.status(404).json({ msg: "Subscription not found" });
    res.status(200).json({ msg: "Subscription deleted" });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({ msg: "Error deleting subscription" });
  }
});

module.exports = router;
