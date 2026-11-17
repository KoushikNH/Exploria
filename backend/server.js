
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const startServer = async () => {
    try {
        // Step 1: Connect to MongoDB
        await connectDB();

        // Step 2: Get the port number
        const PORT = process.env.PORT || 5000;

        // Step 3: Start Express server
        const server = app.listen(PORT, () => {
            console.log("--------------------------------");
            console.log("MongoDB connection successful!");
            console.log(`TerraNova server running on port ${PORT}`);
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
