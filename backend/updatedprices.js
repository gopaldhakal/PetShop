const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Breed = require("./models/Breed");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    updatePrices();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const updatePrices = async () => {
  try {
    // Update documents that lack the price field
    await Breed.updateMany(
      { price: { $exists: false } }, // Filter documents without the price field
      { $set: { price: 100 } } // Set a default price value (e.g., 100)
    );
    console.log("Prices updated successfully");
  } catch (error) {
    console.error("Error updating prices", error);
  } finally {
    mongoose.connection.close();
  }
};
