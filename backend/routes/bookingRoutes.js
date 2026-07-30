const express = require("express");
const bookingController = require("../controllers/bookingController");
const { authenticateToken, requireAdmin } = require("../middleware/authMiddleware");
const { validateCreateBooking, validateUpdateStatus } = require("../middleware/validateBooking");

const router = express.Router();

router.post("/", authenticateToken, validateCreateBooking, bookingController.createBooking);
router.get("/my", authenticateToken, bookingController.getMyBookings);
router.get("/", authenticateToken, requireAdmin, bookingController.getAllBookings);
router.put("/:id/status", authenticateToken, requireAdmin, validateUpdateStatus, bookingController.updateBookingStatus);
router.delete("/:id", authenticateToken, bookingController.deleteBooking);

module.exports = router;
