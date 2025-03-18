const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is running" });
});

// Sample API endpoint
app.get("/api/info", (req, res) => {
  res.json({
    name: "ABADIQ API",
    version: "1.0.0",
    description: "Backend API for ABADIQ Medical Billing Services",
    env: process.env.NODE_ENV,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

// Handle shutdown gracefully
process.on("SIGINT", () => {
  console.log("API server shutting down...");
  process.exit(0);
});

module.exports = app;
