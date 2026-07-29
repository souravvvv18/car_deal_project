require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./database/init");
const authRoutes = require("./routes/authRoutes");

initializeDatabase();

if (!process.env.JWT_SECRET) {
    console.error("Error: JWT_SECRET is not defined in .env");
    process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Car Dealership API");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});