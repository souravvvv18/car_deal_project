require("dotenv").config();

const express = require("express");
const { initializeDatabase } = require("./database/init");

initializeDatabase();

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Car Dealership API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});