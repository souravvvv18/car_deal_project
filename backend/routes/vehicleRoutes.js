const express = require("express");
const vehicleController = require("../controllers/vehicleController");
const { authenticateToken, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", vehicleController.getAllVehicles);
router.get("/:id", vehicleController.getVehicleById);
router.post("/", authenticateToken, requireAdmin, vehicleController.createVehicle);
router.put("/:id", authenticateToken, requireAdmin, vehicleController.updateVehicle);
router.delete("/:id", authenticateToken, requireAdmin, vehicleController.deleteVehicle);

module.exports = router;
