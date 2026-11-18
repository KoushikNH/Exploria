
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start Express server
        const server = app.listen(PORT, "0.0.0.0", () => {
            console.log("--------------------------------");
            console.log("MongoDB connected successfully!");
            console.log(`Explorer server running on port ${PORT}`);
            console.log("--------------------------------");
        });

        // Handle server errors
        server.on("error", (error) => {
            console.error("Server error:", error.message);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

// Start the application
startServer();
