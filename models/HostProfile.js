
const mongoose = require("mongoose");

const hostProfileSchema = new mongoose.Schema(
    {
        // Link this profile to an existing User
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        bio: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        languages: {
            type: [String],
            required: true
        },

        skills: {
            type: [String],
            default: []
        },

        experience: {
            type: Number,
            default: 0,
            min: 0
        },

        verificationStatus: {
            type: String,
            enum: ["pending", "verified", "rejected"],
            default: "pending"
        },

        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const HostProfile = mongoose.model(
    "HostProfile",
    hostProfileSchema
);

module.exports = HostProfile;
