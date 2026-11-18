
const express = require("express");
const router = express.Router();

const {
    uploadMemory,
    getMyMemories,
    getTripMemories,
    updateMemory,
    deleteMemory
} = require("../controllers/memoryController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// All memory routes require authentication
router.use(protect);

// Upload a new memory
router.post("/", upload.single("image"), uploadMemory);

// Get all personal memories
router.get("/", getMyMemories);

// Get memories associated with a trip
router.get("/trip/:tripId", getTripMemories);

// Update memory details
router.put("/:id", updateMemory);

// Delete a memory
router.delete("/:id", deleteMemory);

module.exports = router;
