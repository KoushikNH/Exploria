
const Event = require("../models/Event");

// Create event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      city,
      state,
      startDate,
      endDate,
      entryFee,
      image,
      organizer
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !city ||
      !state ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required event details"
      });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End date cannot be before start date"
      });
    }

    const event = await Event.create({
      title,
      description,
      category,
      location,
      city,
      state,
      startDate,
      endDate,
      entryFee,
      image,
      organizer,
      createdBy: req.user.userId
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all active events with optional filters
const getAllEvents = async (req, res) => {
  try {
    const { search, city, state, category, fromDate } = req.query;

    const filter = {
      isActive: true
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } }
      ];
    }

    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    if (state) {
      filter.state = { $regex: state, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (fromDate) {
      const date = new Date(fromDate);

      if (Number.isNaN(date.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid fromDate format"
        });
      }

      filter.endDate = { $gte: date };
    } else {
      filter.endDate = { $gte: new Date() };
    }

    const events = await Event.find(filter)
      .populate("createdBy", "name")
      .sort({ startDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      isActive: true
    }).populate("createdBy", "name");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid event ID or server error"
    });
  }
};

// Update event (creator only)
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    if (event.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this event"
      });
    }

    const allowedFields = [
      "title",
      "description",
      "category",
      "location",
      "city",
      "state",
      "startDate",
      "endDate",
      "entryFee",
      "image",
      "organizer",
      "isActive"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        event[field] = req.body[field];
      }
    });

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete event (creator only)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    if (event.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this event"
      });
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
