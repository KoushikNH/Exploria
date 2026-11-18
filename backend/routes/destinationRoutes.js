
const express = require("express");
const router = express.Router();

const {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination
} = require("../controllers/destinationController");

const { protect } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);

// Protected routes
router.post("/", protect, createDestination);
router.put("/:id", protect, updateDestination);
router.delete("/:id", protect, deleteDestination);

module.exports = router;
