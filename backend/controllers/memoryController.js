
const Memory = require("../models/Memory");
const Trip = require("../models/Trips");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Helper function: Upload image buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "terranova/memories",
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
};


// 1. Upload a travel memory
const uploadMemory = async (req, res) => {
    let uploadedImage;

    try {
        const {
            tripId,
            title,
            caption,
            location,
            memoryDate
        } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select an image to upload."
            });
        }

        // If tripId is supplied, verify that it belongs to the user
        if (tripId) {
            const trip = await Trip.findOne({
                _id: tripId,
                user: req.user.userId
            });

            if (!trip) {
                return res.status(404).json({
                    success: false,
                    message: "Trip not found."
                });
            }
        }

        if (memoryDate && Number.isNaN(new Date(memoryDate).getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid memory date."
            });
        }

        // Upload image to Cloudinary
        uploadedImage = await uploadToCloudinary(req.file.buffer);

        // Save image information in MongoDB
        const memory = await Memory.create({
            user: req.user.userId,
            trip: tripId || null,
            title: title || "Travel Memory",
            caption: caption || "",
            location: location || "",
            imageUrl: uploadedImage.secure_url,
            cloudinaryPublicId: uploadedImage.public_id,
            memoryDate: memoryDate || new Date()
        });

        return res.status(201).json({
            success: true,
            message: "Travel memory uploaded successfully.",
            memory
        });

    } catch (error) {
        // Remove uploaded image if saving to MongoDB fails
        if (uploadedImage?.public_id) {
            await cloudinary.uploader
                .destroy(uploadedImage.public_id)
                .catch((cleanupError) => {
                    console.error("Cloudinary cleanup error:", cleanupError);
                });
        }

        console.error("Upload memory error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to upload travel memory."
        });
    }
};


// 2. Get all memories of logged-in user
const getMyMemories = async (req, res) => {
    try {
        const memories = await Memory.find({
            user: req.user.userId
        })
            .populate("trip", "title destinations startDate endDate")
            .sort({ memoryDate: -1 });

        return res.status(200).json({
            success: true,
            count: memories.length,
            memories
        });

    } catch (error) {
        console.error("Get memories error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch memories."
        });
    }
};


// 3. Get memories belonging to a particular trip
const getTripMemories = async (req, res) => {
    try {
        const { tripId } = req.params;

        const trip = await Trip.findOne({
            _id: tripId,
            user: req.user.userId
        });

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found."
            });
        }

        const memories = await Memory.find({
            user: req.user.userId,
            trip: tripId
        }).sort({ memoryDate: -1 });

        return res.status(200).json({
            success: true,
            count: memories.length,
            memories
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Unable to fetch trip memories."
        });
    }
};


// 4. Update memory details
const updateMemory = async (req, res) => {
    try {
        const memory = await Memory.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!memory) {
            return res.status(404).json({
                success: false,
                message: "Memory not found."
            });
        }

        const allowedFields = [
            "title",
            "caption",
            "location",
            "memoryDate"
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                memory[field] = req.body[field];
            }
        });

        await memory.save();

        return res.status(200).json({
            success: true,
            message: "Memory updated successfully.",
            memory
        });

    } catch (error) {
        console.error("Update memory error:", error);

        return res.status(400).json({
            success: false,
            message: error.message || "Unable to update memory."
        });
    }
};


// 5. Delete a memory and its Cloudinary image
const deleteMemory = async (req, res) => {
    try {
        const memory = await Memory.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!memory) {
            return res.status(404).json({
                success: false,
                message: "Memory not found."
            });
        }

        await cloudinary.uploader.destroy(
            memory.cloudinaryPublicId,
            { resource_type: "image" }
        );

        await memory.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Memory deleted successfully."
        });

    } catch (error) {
        console.error("Delete memory error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to delete memory."
        });
    }
};


module.exports = {
    uploadMemory,
    getMyMemories,
    getTripMemories,
    updateMemory,
    deleteMemory
};
