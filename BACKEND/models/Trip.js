const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tripName: {
        type: String,
        required: true
    },
    destinations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination"
    }],
    startDate: Date,
    endDate: Date,
    totalBudget: Number,
    status: {
        type: String,
        enum: ["planned", "ongoing", "completed"],
        default: "planned"
    }
}, {
    timestamps: true,
    collection: "trips"
});

module.exports = mongoose.model("Trip", tripSchema);