const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },
    category: String,
    images: [String],
    bestTimeToVisit: String,
    averageCost: Number,
    rating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    collection: "destinations"
});

destinationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Destination", destinationSchema);