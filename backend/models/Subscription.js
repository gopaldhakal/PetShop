const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
