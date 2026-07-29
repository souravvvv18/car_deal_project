const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const SALT_ROUNDS = 10;

function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
}

async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = userModel.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = userModel.createUser({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: { user },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Registration failed.",
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = userModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const token = generateToken(user);
        const { password: _, ...safeUser } = user;

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: { user: safeUser, token },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failed.",
        });
    }
}

function getProfile(req, res) {
    const user = userModel.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found.",
        });
    }

    return res.status(200).json({
        success: true,
        data: { user },
    });
}

module.exports = { register, login, getProfile };
