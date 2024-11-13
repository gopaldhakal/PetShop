const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // Import MongoDB connection logic

// Import Routes
const dashboardRoutes = require("./routes/dashboardRoutes"); // Dashboard routes (protected routes)
const breedRoutes = require("./routes/breedRoutes");
const productRoutes = require("./routes/productRoutes");
const blogRoutes = require("./routes/blogRoutes");
const adminAuthRoutes = require("./routes/adminAuth"); // Admin authentication routes
const subscriptionRoutes = require("./routes/subscriptionRoutes");

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB using the imported connectDB function
connectDB();

// Enable CORS
app.use(cors());

// Body parser to parse JSON data from requests
app.use(express.json()); // Use built-in express json parser

// Health check route (to test if the server is working)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Mount routers
// Public APIs
app.use("/api/breeds", breedRoutes);
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// Admin panel (protected routes)
app.use("/api/admin/auth", adminAuthRoutes); // Admin authentication routes (login/signup)

// Example of additional admin routes for Blog, Breed, Product CRUD operations
// app.use("/api/admin/blogs", adminBlogRoutes); // Protect with middleware for authentication

// Error handling middleware (to catch errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Define PORT and listen to incoming requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
