
const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      default: "India"
    },
    category: {
      type: String,
      enum: [
        "Nature",
        "Heritage",
        "Adventure",
        "Spiritual",
        "Beach",
        "Wildlife",
        "Other"
      ],
      default: "Other"
    },
    bestTimeToVisit: {
      type: String,
      default: ""
    },
    sustainabilityTips: [{
      type: String
    }],
    image: {
      type: String,
      default: ""
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", destinationSchema);
