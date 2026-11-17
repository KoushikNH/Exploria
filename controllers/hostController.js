
const HostProfile = require("../models/HostProfile");
const User = require("../models/User");

// Create a host profile
const createHostProfile = async (req, res) => {
    try {
        // Find the logged-in user
        const user = await User.findById(req.user.userId);

        if (!user || !user.isActive) {
            return res.status(404).json({
                success: false,
                message: "User account not found or inactive."
            });
        }

        // Only local users can create host profiles
        if (user.role !== "local") {
            return res.status(403).json({
                success: false,
                message: "Only local users can create host profiles."
            });
        }

        const {
            bio,
            location,
            languages,
            skills,
            experience
        } = req.body;

        // Validate required fields
        if (
            !bio ||
            !location ||
            !Array.isArray(languages) ||
            languages.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Bio, location and at least one language are required."
            });
        }

        // Check whether a profile already exists
        const existingProfile = await HostProfile.findOne({
            user: user._id
        });

        if (existingProfile) {
            return res.status(409).json({
                success: false,
                message: "Host profile already exists."
            });
        }

        // Create the host profile
        const hostProfile = await HostProfile.create({
            user: user._id,
            bio,
            location,
            languages,
            skills: skills || [],
            experience: experience || 0
        });

        return res.status(201).json({
            success: true,
            message: "Host profile created successfully. Awaiting verification.",
            hostProfile
        });

    } catch (error) {
        console.error("Create host profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to create host profile."
        });
    }
};


// Get all verified and available hosts
const getAllHosts = async (req, res) => {
    try {
        const hosts = await HostProfile.find({
            verificationStatus: "verified",
            isAvailable: true
        })
        .populate("user", "name email profileImage")
        .select("-__v");

        return res.status(200).json({
            success: true,
            count: hosts.length,
            hosts
        });

    } catch (error) {
        console.error("Get hosts error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch host profiles."
        });
    }
};


// Export controllers AFTER declaring them
module.exports = {
    createHostProfile,
    getAllHosts
};
