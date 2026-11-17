
const express = require("express");
const router = express.Router();

const {
    createBooking,
    getMyBookings,
    getHostBookings,
    getBookingById,
    updateBookingStatus,
    cancelMyBooking
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

// All booking routes require authentication
router.use(protect);

// Tourist creates a booking
router.post("/experience/:experienceId", createBooking);

// Tourist views their bookings
router.get("/my", getMyBookings);

// Host views received bookings
router.get("/host", getHostBookings);

// Host confirms, cancels or completes a booking
router.patch("/:id/status", updateBookingStatus);

// Tourist cancels their own booking
router.patch("/:id/cancel", cancelMyBooking);

// Tourist or host views booking details
router.get("/:id", getBookingById);

module.exports = router;
