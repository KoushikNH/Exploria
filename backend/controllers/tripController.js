
const Trip = require("../models/Trips");

// 1. Create a new trip
const createTrip = async (req, res) => {
    try {
        const {
            title,
            description,
            destinations,
            startDate,
            endDate,
            budget
        } = req.body;

        if (
            !title ||
            !Array.isArray(destinations) ||
            destinations.length === 0 ||
            !startDate ||
            !endDate ||
            budget === undefined ||
            budget === null
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required trip details."
            });
        }

        if (
            typeof budget !== "number" ||
            !Number.isFinite(budget) ||
            budget < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Budget must be a valid non-negative number."
            });
        }

        const trip = await Trip.create({
            user: req.user.userId,
            title,
            description,
            destinations,
            startDate,
            endDate,
            budget
        });

        return res.status(201).json({
            success: true,
            message: "Trip created successfully.",
            trip
        });

    } catch (error) {
        console.error("Create trip error:", error);

        return res.status(400).json({
            success: false,
            message: error.message || "Unable to create trip."
        });
    }
};


// 2. Get all trips belonging to logged-in user
const getMyTrips = async (req, res) => {
    try {
        const trips = await Trip.find({
            user: req.user.userId
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: trips.length,
            trips
        });

    } catch (error) {
        console.error("Get trips error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch trips."
        });
    }
};


// 3. Get a single trip
const getTripById = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found."
            });
        }

        return res.status(200).json({
            success: true,
            trip
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid trip ID."
        });
    }
};


// 4. Update a trip
const updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found."
            });
        }

        const allowedFields = [
            "title",
            "description",
            "destinations",
            "startDate",
            "endDate",
            "budget",
            "status"
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                trip[field] = req.body[field];
            }
        });

        await trip.save();

        return res.status(200).json({
            success: true,
            message: "Trip updated successfully.",
            trip
        });

    } catch (error) {
        console.error("Update trip error:", error);

        return res.status(400).json({
            success: false,
            message: error.message || "Unable to update trip."
        });
    }
};


// 5. Delete a trip
const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found."
            });
        }

        await trip.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Trip deleted successfully."
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid trip ID."
        });
    }
};


module.exports = {
    createTrip,
    getMyTrips,
    getTripById,
    updateTrip,
    deleteTrip
};
