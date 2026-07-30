const { BOOKING_STATUSES } = require("../models/bookingModel");
const carModel = require("../models/carModel");

const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

function validateCreateBooking(req, res, next) {
    const { carId, customerName, phone, preferredDate, preferredTime } = req.body;
    const errors = [];

    const carIdNum = Number(carId);
    if (!Number.isInteger(carIdNum) || carIdNum <= 0) {
        errors.push("A valid carId is required.");
    } else {
        const car = carModel.findById(carIdNum);
        if (!car) {
            errors.push("Car not found.");
        }
    }

    if (!customerName || typeof customerName !== "string" || !customerName.trim()) {
        errors.push("Customer name is required.");
    }

    if (!phone || typeof phone !== "string" || !PHONE_REGEX.test(phone.trim())) {
        errors.push("A valid phone number is required.");
    }

    if (!preferredDate || typeof preferredDate !== "string" || !DATE_REGEX.test(preferredDate.trim())) {
        errors.push("Preferred date is required in YYYY-MM-DD format.");
    } else {
        const date = new Date(preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (Number.isNaN(date.getTime()) || date < today) {
            errors.push("Preferred date must be today or a future date.");
        }
    }

    if (!preferredTime || typeof preferredTime !== "string" || !TIME_REGEX.test(preferredTime.trim())) {
        errors.push("Preferred time is required in HH:MM (24-hour) format.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: "Validation failed.", errors });
    }

    req.body = {
        carId: carIdNum,
        customerName: customerName.trim(),
        phone: phone.trim(),
        preferredDate: preferredDate.trim(),
        preferredTime: preferredTime.trim(),
    };

    next();
}

function validateUpdateStatus(req, res, next) {
    const { status } = req.body;
    const errors = [];

    if (!status || typeof status !== "string" || !BOOKING_STATUSES.includes(status)) {
        errors.push(`Status must be one of: ${BOOKING_STATUSES.join(", ")}.`);
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: "Validation failed.", errors });
    }

    next();
}

module.exports = { validateCreateBooking, validateUpdateStatus };
