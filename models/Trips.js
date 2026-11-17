
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        // User who owns the trip
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Trip details
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        // Travel destinations
        destinations: {
            type: [String],
            required: true,
            validate: {
                validator: function (value) {
                    return value.length > 0 &&
                        value.every(item => item.trim().length > 0);
                },
                message: "At least one valid destination is required."
            }
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        // Estimated total trip budget
        budget: {
            type: Number,
            required: true,
            min: 0
        },

        // Trip status
        status: {
            type: String,
            enum: ["planned", "ongoing", "completed", "cancelled"],
            default: "planned"
        }
    },
    {
        timestamps: true
    }
);

// Ensure end date is not before start date
tripSchema.pre("validate", function () {
    if (this.startDate && this.endDate && this.endDate < this.startDate) {
        this.invalidate("endDate", "End date cannot be before start date.");
    }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
