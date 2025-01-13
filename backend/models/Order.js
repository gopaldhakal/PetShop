const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  deliveryLocation: { type: String, required: true },
  paymentScreenshot: { type: String, required: true },
  cart: { type: Array, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
