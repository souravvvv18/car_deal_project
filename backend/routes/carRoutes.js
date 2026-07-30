const express = require("express");
const carController = require("../controllers/carController");
const { authenticateToken, requireAdmin } = require("../middleware/authMiddleware");
const { validateCreateCar, validateUpdateCar } = require("../middleware/validateCar");

const router = express.Router();
console.log("Car routes loaded");
router.get("/", carController.getAllCars);
router.get("/:id", carController.getCarById);
router.post("/", authenticateToken, requireAdmin, validateCreateCar, carController.createCar);
router.put("/:id", authenticateToken, requireAdmin, validateUpdateCar, carController.updateCar);
router.delete("/:id", authenticateToken, requireAdmin, carController.deleteCar);

module.exports = router;
