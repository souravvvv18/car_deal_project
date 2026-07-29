const { ALLOWED_ROLES } = require("../models/userModel");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegister(req, res, next) {
    const { name, email, password, role } = req.body;
    const errors = [];

    if (!name || typeof name !== "string" || !name.trim()) {
        errors.push("Name is required.");
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
        errors.push("A valid email is required.");
    }

    if (!password || typeof password !== "string" || password.length < 6) {
        errors.push("Password is required and must be at least 6 characters.");
    }

    if (role !== undefined) {
        if (typeof role !== "string" || !ALLOWED_ROLES.includes(role)) {
            errors.push(`Role must be one of: ${ALLOWED_ROLES.join(", ")}.`);
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: "Validation failed.", errors });
    }

    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.role = role || "customer";

    next();
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;
    const errors = [];

    if (!email || typeof email !== "string" || !email.trim()) {
        errors.push("Email is required.");
    }

    if (!password || typeof password !== "string") {
        errors.push("Password is required.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: "Validation failed.", errors });
    }

    req.body.email = email.trim().toLowerCase();

    next();
}

module.exports = { validateRegister, validateLogin };
