
const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
        // Host who created this experience
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Basic experience details
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000
        },

        // Experience category
        category: {
            type: String,
            required: true,
            enum: [
                "Food",
                "Culture",
                "Adventure",
                "Art & Craft",
                "Nature",
                "Heritage",
                "Other"
            ]
        },

        // Where the experience takes place
        location: {
            type: String,
            required: true,
            trim: true
        },

        // Price per person
        price: {
            type: Number,
            required: true,
            min: 0
        },

        // Duration in hours
        duration: {
            type: Number,
            required: true,
            min: 0.5
        },

        // Maximum number of participants
        maxParticipants: {
            type: Number,
            required: true,
            min: 1
        },

        // Experience photo URL (Cloudinary can be added later)
        image: {
            type: String,
            default: ""
        },

        // Whether tourists can currently book it
        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
