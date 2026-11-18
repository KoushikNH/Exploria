const Expense = require("../models/Expense");

// Get all expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find()
            .populate("paidBy", "name email")
            .populate("splitBetween", "name");

        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Add expense
exports.addExpense = async (req, res) => {
    try {
        const {
            tripId,
            paidBy,
            description,
            category,
            amount,
            splitBetween,
            expenseDate
        } = req.body;

        const expense = await Expense.create({
            tripId,
            paidBy,
            description,
            category,
            amount,
            splitBetween,
            expenseDate
        });

        res.status(201).json({
            success: true,
            message: "Expense added successfully",
            expense
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};