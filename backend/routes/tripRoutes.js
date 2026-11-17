
const express = require("express");
const router = express.Router();

const {
    createTrip,
    getMyTrips,
    getTripById,
    updateTrip,
    deleteTrip
} = require("../controllers/tripController");

const { protect } = require("../middleware/authMiddleware");

// All trip routes require login
router.use(protect);

router.post("/", createTrip);
router.get("/", getMyTrips);
router.get("/:id", getTripById);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

module.exports = router;
