const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
    res.send("Welcome to TerraNova Backend!");
});

// Health check API
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "TerraNova backend is working!"
    });
});

module.exports = app;