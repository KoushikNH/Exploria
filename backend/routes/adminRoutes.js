
const express = require("express");
const router = express.Router();

const {
    updateHostVerification
} = require("../controllers/adminController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

router.patch(
    "/hosts/:hostId/verification",
    protect,
    adminOnly,
    updateHostVerification
);

module.exports = router;
