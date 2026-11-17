
const Experience = require("../models/Experience");

// 1. Create a new experience
const createExperience = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            location,
            price,
            duration,
            maxParticipants,
            image
        } = req.body;

        // Check required fields
        if (
            !title ||
            !description ||
            !category ||
            !location ||
            price === undefined ||
            !duration ||
            !maxParticipants
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields."
            });
        }

        // Only local hosts can create experiences
        if (req.user.role !== "local") {
            return res.status(403).json({
                success: false,
                message: "Only local hosts can create experiences."
            });
        }

        // Create experience
        const experience = await Experience.create({
            host: req.user.userId,
            title,
            description,
            category,
            location,
            price,
            duration,
            maxParticipants,
            image: image || ""
        });

        return res.status(201).json({
            success: true,
            message: "Experience created successfully.",
            experience
        });

    } catch (error) {
        console.error("Create experience error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to create experience."
        });
    }
};


// 2. Get all available experiences
const getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find({
            isAvailable: true
        })
            .populate("host", "name profileImage")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: experiences.length,
            experiences
        });

    } catch (error) {
        console.error("Get experiences error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch experiences."
        });
    }
};


// 3. Get a single experience by ID
const getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id)
            .populate("host", "name profileImage");

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found."
            });
        }

        return res.status(200).json({
            success: true,
            experience
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid experience ID."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Unable to fetch experience."
        });
    }
};


// 4. Update an experience
const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found."
            });
        }

        // Only the experience owner can update it
        if (experience.host.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own experiences."
            });
        }

        const allowedFields = [
            "title",
            "description",
            "category",
            "location",
            "price",
            "duration",
            "maxParticipants",
            "image",
            "isAvailable"
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                experience[field] = req.body[field];
            }
        });

        await experience.save();

        return res.status(200).json({
            success: true,
            message: "Experience updated successfully.",
            experience
        });

    } catch (error) {
        console.error("Update experience error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update experience."
        });
    }
};


// 5. Delete an experience
const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found."
            });
        }

        // Only the experience owner can delete it
        if (experience.host.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own experiences."
            });
        }

        await experience.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Experience deleted successfully."
        });

    } catch (error) {
        console.error("Delete experience error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to delete experience."
        });
    }
};


module.exports = {
    createExperience,
    getAllExperiences,
    getExperienceById,
    updateExperience,
    deleteExperience
};
