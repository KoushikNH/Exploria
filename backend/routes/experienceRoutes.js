
const express = require("express");
const router = express.Router();

const {
    createExperience,
    getAllExperiences,
    getExperienceById,
    updateExperience,
    deleteExperience
} = require("../controllers/experienceController");

const { protect } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllExperiences);
router.get("/:id", getExperienceById);

// Protected routes (login required)
router.post("/", protect, createExperience);
router.put("/:id", protect, updateExperience);
router.delete("/:id", protect, deleteExperience);

module.exports = router;
