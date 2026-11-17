
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

// Routes
const authRoutes = require("./routes/authRoutes");
const hostRoutes = require("./routes/hostRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const tripRoutes = require("./routes/tripRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const memoryRoutes = require("./routes/memoryRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/hosts", hostRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/memories", memoryRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/events", eventRoutes);


module.exports = app;
