const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    phone: String,
    profileImage: String,
    bio: String,
    interests: [String],
    languages: [String],
    location: {
        type: String
    }
}, {
    timestamps: true,
    collection: "profiles"
});

module.exports = mongoose.model("Profile", profileSchema);