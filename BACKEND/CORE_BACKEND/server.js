const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        project: "Exploria",
        message: "Backend is running successfully!",
        developer: "M4 - Core Backend"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Exploria Backend running on port ${PORT}`);
});
