const bookingModel = require("../models/bookingModel");

function createBooking(req, res) {
    try {
        const booking = bookingModel.createBooking({
            userId: req.user.id,
            ...req.body,
        });

        return res.status(201).json({
            success: true,
            message: "Test drive booking created successfully.",
            data: { booking },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create booking.",
        });
    }
}

function getMyBookings(req, res) {
    try {
        const bookings = bookingModel.findByUserId(req.user.id);

        return res.status(200).json({
            success: true,
            count: bookings.length,
            data: { bookings },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch your bookings.",
        });
    }
}

function getAllBookings(req, res) {
    try {
        const bookings = bookingModel.findAll();

        return res.status(200).json({
            success: true,
            count: bookings.length,
            data: { bookings },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch bookings.",
        });
    }
}

function updateBookingStatus(req, res) {
    try {
        const booking = bookingModel.updateStatus(req.params.id, req.body.status);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Booking status updated successfully.",
            data: { booking },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update booking status.",
        });
    }
}

function deleteBooking(req, res) {
    try {
        const existing = bookingModel.findRawById(req.params.id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Booking not found.",
            });
        }

        const isOwner = existing.userId === req.user.id;
        const isAdmin = req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You can only cancel your own bookings.",
            });
        }

        bookingModel.deleteBooking(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Booking cancelled successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to cancel booking.",
        });
    }
}

module.exports = {
    createBooking,
    getMyBookings,
    getAllBookings,
    updateBookingStatus,
    deleteBooking,
};
