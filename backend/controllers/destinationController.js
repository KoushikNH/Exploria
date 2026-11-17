
const Destination = require("../models/Destination");

// Create destination
const createDestination = async (req, res) => {
  try {
    const {
      name,
      description,
      city,
      state,
      country,
      category,
      bestTimeToVisit,
      sustainabilityTips,
      image
    } = req.body;

    if (!name || !description || !city || !state) {
      return res.status(400).json({
        success: false,
        message: "Name, description, city and state are required"
      });
    }

    const destination = await Destination.create({
      name,
      description,
      city,
      state,
      country,
      category,
      bestTimeToVisit,
      sustainabilityTips,
      image,
      createdBy: req.user.userId
    });

    res.status(201).json({
      success: true,
      message: "Destination created successfully",
      destination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all destinations with optional filters
const getAllDestinations = async (req, res) => {
  try {
    const { search, state, category, city } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } }
      ];
    }

    if (state) {
      filter.state = { $regex: state, $options: "i" };
    }

    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const destinations = await Destination.find(filter)
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: destinations.length,
      destinations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get destination by ID
const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate("createdBy", "name");

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found"
      });
    }

    res.status(200).json({
      success: true,
      destination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid destination ID or server error"
    });
  }
};

// Update destination (creator only)
const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found"
      });
    }

    if (destination.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this destination"
      });
    }

    const allowedFields = [
      "name",
      "description",
      "city",
      "state",
      "country",
      "category",
      "bestTimeToVisit",
      "sustainabilityTips",
      "image"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        destination[field] = req.body[field];
      }
    });

    await destination.save();

    res.status(200).json({
      success: true,
      message: "Destination updated successfully",
      destination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete destination (creator only)
const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found"
      });
    }

    if (destination.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this destination"
      });
    }

    await destination.deleteOne();

    res.status(200).json({
      success: true,
      message: "Destination deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination
};
