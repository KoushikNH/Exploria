
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");

const createAdmin = async () => {
    try {
        // Validate environment variables
        const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

        if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
            throw new Error("Admin environment variables are missing.");
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        const email = ADMIN_EMAIL.toLowerCase().trim();

        // Check whether the admin already exists
        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            if (existingAdmin.role === "admin") {
                console.log("Admin account already exists.");
                return;
            }

            throw new Error(
                "This email already belongs to a non-admin account. Use another email."
            );
        }

        // Create Admin account
        // User model automatically hashes the password
        const admin = await User.create({
            name: ADMIN_NAME,
            email,
            password: ADMIN_PASSWORD,
            role: "admin"
        });

        console.log("Admin account created successfully!");
        console.log("Admin Email:", admin.email);
        console.log("Admin Role:", admin.role);

    } catch (error) {
        console.error("Admin creation failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
