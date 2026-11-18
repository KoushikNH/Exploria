const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination"
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    price: Number,
    duration: String,
    category: String,
    images: [String],
    rating: {
        type: Number,
        default: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: "experiences"
});

module.exports = mongoose.model("Experience", experienceSchema);