
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        // Tourist who made the booking
        tourist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Experience being booked
        experience: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience",
            required: true
        },

        // Host providing the experience
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Booking schedule
        bookingDate: {
            type: Date,
            required: true
        },

        participants: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: "Participants must be a whole number."
            }
        },

        // Price per participant and total amount
        pricePerPerson: {
            type: Number,
            required: true,
            min: 0
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        // Booking status
        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "cancelled",
                "completed"
            ],
            default: "pending"
        },

        // Payment status (actual payment integration later)
        paymentStatus: {
            type: String,
            enum: [
                "pending",
                "paid",
                "refunded"
            ],
            default: "pending"
        },

        notes: {
            type: String,
            default: "",
            trim: true,
            maxlength: 500
        }
    },
    {
        timestamps: true
    }
);

// Prevent invalid booking totals
bookingSchema.pre("validate", function () {
    if (
        this.participants &&
        this.pricePerPerson !== undefined
    ) {
        this.totalAmount =
            this.participants * this.pricePerPerson;
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
