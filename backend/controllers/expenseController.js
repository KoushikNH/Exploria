
const Expense = require("../models/Expense");
const Trip = require("../models/Trips");

// 1. Add a new expense
const createExpense = async (req, res) => {
    try {
        const { tripId } = req.params;

        const {
            title,
            category,
            amount,
            splitCount,
            expenseDate,
            notes
        } = req.body;

        // Check required fields
        if (
            !title ||
            !category ||
            amount === undefined ||
            amount === null
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, category and amount."
            });
        }

        if (
            typeof amount !== "number" ||
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Amount must be a positive number."
            });
        }

        // Check whether the trip belongs to the logged-in user
        const trip = await Trip.findOne({
            _id: tripId,
            user: req.user.userId
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found."
            });
        }

        const expense = await Expense.create({
            trip: trip._id,
            user: req.user.userId,
            title,
            category,
            amount,
            splitCount: splitCount === undefined ? 1 : splitCount,
            expenseDate,
            notes
        });

        return res.status(201).json({
            success: true,
            message: "Expense added successfully.",
            expense
        });

    } catch (error) {
        console.error("Create expense error:", error);

        return res.status(400).json({
            success: false,
            message: error.message || "Unable to add expense."
        });
    }
};


// 2. Get all expenses for a trip
const getTripExpenses = async (req, res) => {
    try {
        const { tripId } = req.params;

        const trip = await Trip.findOne({
            _id: tripId,
            user: req.user.userId
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found."
            });
        }

        const expenses = await Expense.find({
            trip: tripId,
            user: req.user.userId
        }).sort({ expenseDate: -1 });

        return res.status(200).json({
            success: true,
            count: expenses.length,
            expenses
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Unable to fetch expenses."
        });
    }
};


// 3. Get expense summary for a trip
const getExpenseSummary = async (req, res) => {
    try {
        const { tripId } = req.params;

        const trip = await Trip.findOne({
            _id: tripId,
            user: req.user.userId
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found."
            });
        }

        const expenses = await Expense.find({
            trip: tripId,
            user: req.user.userId
        });

        const totalSpent = expenses.reduce(
            (total, expense) => total + expense.amount,
            0
        );

        const categorySummary = {};

        expenses.forEach((expense) => {
            categorySummary[expense.category] =
                (categorySummary[expense.category] || 0) +
                expense.amount;
        });

        const remainingBudget = trip.budget - totalSpent;

        return res.status(200).json({
            success: true,
            summary: {
                plannedBudget: trip.budget,
                totalSpent: Number(totalSpent.toFixed(2)),
                remainingBudget: Number(remainingBudget.toFixed(2)),
                budgetExceeded: remainingBudget < 0,
                expenseCount: expenses.length,
                categorySummary
            }
        });

    } catch (error) {
        console.error("Expense summary error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to calculate expense summary."
        });
    }
};


// 4. Update an expense
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found."
            });
        }

        const allowedFields = [
            "title",
            "category",
            "amount",
            "splitCount",
            "expenseDate",
            "notes"
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                expense[field] = req.body[field];
            }
        });

        await expense.save();

        return res.status(200).json({
            success: true,
            message: "Expense updated successfully.",
            expense
        });

    } catch (error) {
        console.error("Update expense error:", error);

        return res.status(400).json({
            success: false,
            message: error.message || "Unable to update expense."
        });
    }
};


// 5. Delete an expense
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found."
            });
        }

        await expense.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully."
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Unable to delete expense."
        });
    }
};


module.exports = {
    createExpense,
    getTripExpenses,
    getExpenseSummary,
    updateExpense,
    deleteExpense
};
