const mongoose = require("mongoose");
const breedSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true }, // Added description field
});

module.exports = mongoose.model("Breed", breedSchema);
