const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    experienceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience"
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle"
    },
    bookingDate: Date,
    numberOfPeople: {
        type: Number,
        default: 1
    },
    totalAmount: Number,
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending"
    }
}, {
    timestamps: true,
    collection: "bookings"
});

module.exports = mongoose.model("Booking", bookingSchema);