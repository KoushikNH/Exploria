	const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["tourist", "host", "admin"],
        default: "tourist"
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: "users"
});

module.exports = mongoose.model("User", userSchema);