const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "other"
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    splitBetween: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    expenseDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: "expenses"
});

module.exports = mongoose.model("Expense", expenseSchema);