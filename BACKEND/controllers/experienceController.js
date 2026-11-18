const Experience = require("../models/Experience");

// Get all active experiences
exports.getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find({ isActive: true });

        res.status(200).json({
            success: true,
            count: experiences.length,
            experiences
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};