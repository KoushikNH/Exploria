
const express = require("express");
const router = express.Router();

const {
    createExpense,
    getTripExpenses,
    getExpenseSummary,
    updateExpense,
    deleteExpense
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

// All expense APIs require login
router.use(protect);

// Create an expense for a trip
router.post("/trips/:tripId", createExpense);

// Get all expenses for a trip
router.get("/trips/:tripId", getTripExpenses);

// Get budget and expense summary
router.get("/trips/:tripId/summary", getExpenseSummary);

// Update an expense
router.put("/:id", updateExpense);

// Delete an expense
router.delete("/:id", deleteExpense);

module.exports = router;
