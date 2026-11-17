
const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema(
    {
        // User who uploaded the memory
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Optional trip associated with the photo
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            default: null
        },

        title: {
            type: String,
            trim: true,
            maxlength: 100,
            default: "Travel Memory"
        },

        caption: {
            type: String,
            trim: true,
            maxlength: 500,
            default: ""
        },

        location: {
            type: String,
            trim: true,
            default: ""
        },

        // Cloudinary image URL
        imageUrl: {
            type: String,
            required: true
        },

        // Cloudinary public ID, needed to delete the image
        cloudinaryPublicId: {
            type: String,
            required: true
        },

        memoryDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Memory = mongoose.model("Memory", memorySchema);

module.exports = Memory;
