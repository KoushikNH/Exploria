
const Booking = require("../models/Booking");
const Experience = require("../models/Experience");

// 1. Create a booking
const createBooking = async (req, res) => {
    try {
        const { experienceId } = req.params;
        const { bookingDate, participants, notes } = req.body;

        if (!bookingDate || participants === undefined) {
            return res.status(400).json({
                success: false,
                message: "Please provide booking date and participants."
            });
        }

        if (
            !Number.isInteger(participants) ||
            participants < 1
        ) {
            return res.status(400).json({
                success: false,
                message: "Participants must be a positive whole number."
            });
        }

        const selectedDate = new Date(bookingDate);

        if (
            Number.isNaN(selectedDate.getTime()) ||
            selectedDate <= new Date()
        ) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid future booking date."
            });
        }

        const experience = await Experience.findById(experienceId);

        if (!experience || !experience.isAvailable) {
            return res.status(404).json({
                success: false,
                message: "Experience not found or unavailable."
            });
        }

        if (experience.host.toString() === req.user.userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot book your own experience."
            });
        }

        if (participants > experience.maxParticipants) {
            return res.status(400).json({
                success: false,
                message: "Participant count exceeds experience capacity."
            });
        }

        // Check existing bookings for the same experience and date
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const existingBookings = await Booking.find({
            experience: experienceId,
            bookingDate: {
                $gte: startOfDay,
                $lte: endOfDay
            },
            status: { $in: ["pending", "confirmed"] }
        });

        const alreadyBooked = existingBookings.reduce(
            (total, booking) => total + booking.participants,
            0
        );

        if (
            alreadyBooked + participants >
            experience.maxParticipants
        ) {
            return res.status(400).json({
                success: false,
                message: "Not enough participant capacity available for this date."
            });
        }

        const booking = await Booking.create({
            tourist: req.user.userId,
            experience: experience._id,
            host: experience.host,
            bookingDate: selectedDate,
            participants,
            pricePerPerson: experience.price,
            totalAmount: experience.price * participants,
            notes: notes || ""
        });

        return res.status(201).json({
            success: true,
            message: "Booking created successfully.",
            booking
        });

    } catch (error) {
        console.error("Create booking error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to create booking."
        });
    }
};


// 2. Get bookings made by the logged-in tourist
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            tourist: req.user.userId
        })
            .populate("experience", "title location image price")
            .populate("host", "name profileImage")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });

    } catch (error) {
        console.error("Get tourist bookings error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch bookings."
        });
    }
};


// 3. Get bookings received by the logged-in host
const getHostBookings = async (req, res) => {
    try {
        if (req.user.role !== "local") {
            return res.status(403).json({
                success: false,
                message: "Only local hosts can view received bookings."
            });
        }

        const bookings = await Booking.find({
            host: req.user.userId
        })
            .populate("experience", "title location image price")
            .populate("tourist", "name email profileImage")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });

    } catch (error) {
        console.error("Get host bookings error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch host bookings."
        });
    }
};


// 4. Get one booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("experience", "title location image price")
            .populate("tourist", "name email")
            .populate("host", "name email");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found."
            });
        }

        const isTourist =
            booking.tourist._id.toString() === req.user.userId;

        const isHost =
            booking.host._id.toString() === req.user.userId;

        if (!isTourist && !isHost) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to view this booking."
            });
        }

        return res.status(200).json({
            success: true,
            booking
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid booking ID."
        });
    }
};


// 5. Host updates booking status
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["confirmed", "cancelled", "completed"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking status."
            });
        }

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found."
            });
        }

        if (booking.host.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "Only the experience host can update this booking."
            });
        }

        if (
            booking.status === "cancelled" ||
            booking.status === "completed"
        ) {
            return res.status(400).json({
                success: false,
                message: "This booking can no longer be updated."
            });
        }

        if (
            status === "completed" &&
            booking.status !== "confirmed"
        ) {
            return res.status(400).json({
                success: false,
                message: "Only confirmed bookings can be completed."
            });
        }

        booking.status = status;
        await booking.save();

        return res.status(200).json({
            success: true,
            message: `Booking ${status} successfully.`,
            booking
        });

    } catch (error) {
        console.error("Update booking error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update booking."
        });
    }
};


// 6. Tourist cancels their booking
const cancelMyBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id,
            tourist: req.user.userId
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found."
            });
        }

        if (
            booking.status === "cancelled" ||
            booking.status === "completed"
        ) {
            return res.status(400).json({
                success: false,
                message: "This booking cannot be cancelled."
            });
        }

        booking.status = "cancelled";
        await booking.save();

        return res.status(200).json({
            success: true,
            message: "Booking cancelled successfully.",
            booking
        });

    } catch (error) {
        console.error("Cancel booking error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to cancel booking."
        });
    }
};


module.exports = {
    createBooking,
    getMyBookings,
    getHostBookings,
    getBookingById,
    updateBookingStatus,
    cancelMyBooking
};
