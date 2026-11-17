
const express = require("express");

const router = express.Router();

const {
    createHostProfile,
    getAllHosts
} = require("../controllers/hostController");

const { protect } = require("../middleware/authMiddleware");

// Get all verified and available hosts
router.get("/", getAllHosts);

// Create a host profile (login required)
router.post("/profile", protect, createHostProfile);

module.exports = router;
