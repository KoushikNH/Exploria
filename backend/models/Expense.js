
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        // Trip associated with this expense
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            required: true
        },

        // User who recorded the expense
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Food",
                "Transport",
                "Accommodation",
                "Activities",
                "Shopping",
                "Other"
            ]
        },

        amount: {
            type: Number,
            required: true,
            min: 0.01
        },

        // Number of people sharing this expense
        splitCount: {
            type: Number,
            default: 1,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: "Split count must be a whole number."
            }
        },

        expenseDate: {
            type: Date,
            default: Date.now
        },

        notes: {
            type: String,
            default: "",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
