const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: String,
    date: {
        type: Date,
        default: Date.now
    },
    paidBy: String,
    notes: String
}, {
    timestamps: true,
    collection: "expenses"
});

module.exports = mongoose.model("Expense", expenseSchema);