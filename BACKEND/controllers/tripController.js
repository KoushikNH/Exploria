
const Trip = require("../models/Trip");

// Create a trip
exports.createTrip = async (req, res) => {
    try {
        const {
            userId,
            tripName,
            destinations,
            startDate,
            endDate,
            numberOfTravelers,
            budget
        } = req.body;

        const trip = await Trip.create({
            userId,
            tripName,
            destinations,
            startDate,
            endDate,
            numberOfTravelers,
            budget
        });

        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            trip
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            details: error.errors || error
        });
    }
};

// Get all trips
exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find()
            .populate("userId", "name email")
            .populate("destinations");

        res.status(200).json({
            success: true,
            count: trips.length,
            trips
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
