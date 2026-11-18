const Destination = require("../models/Destination");

// Get all destinations
exports.getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();

        res.status(200).json({
            success: true,
            count: destinations.length,
            destinations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};