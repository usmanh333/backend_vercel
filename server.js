const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors"); // Import CORS middleware

dotenv.config();

const authRoutes = require("./routes/auth");
const carRoutes = require("./routes/car");

const app = express();

// CORS configuration to allow preflight requests and specific methods
const corsOptions = {
  origin: "https://frontend-vercel-gamma.vercel.app", // Allow your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure OPTIONS is included for preflight requests
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Ensure necessary headers are allowed
  preflightContinue: false, // Automatically send the response for OPTIONS requests
  optionsSuccessStatus: 200, // Some legacy browsers (IE11) require a status code of 200
};

// Enable CORS with the specified options
app.use(cors());

// Enable parsing JSON and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/car", carRoutes);

// Test route
app.get("/", (req, res) => {
  const message = "Hello";
  res.send(message);
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(5000, () => console.log("Server running on port 5000"))
  )
  .catch((err) => console.log(err));

  module.exports = app;
