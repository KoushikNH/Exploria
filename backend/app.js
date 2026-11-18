
const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Welcome page
app.get("/", (req, res) => {
    res.send("Welcome to Explorer!");
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Explorer backend is working!"
    });
});

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profiles", require("./routes/profileRoutes"));
app.use("/api/destinations", require("./routes/destinationRoutes"));
app.use("/api/experiences", require("./routes/experienceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));

app.use("/api/hosts", require("./routes/hostRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/memories", require("./routes/memoryRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));

module.exports = app;
