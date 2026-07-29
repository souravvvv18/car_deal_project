const express = require("express");
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");
const { validateRegister, validateLogin } = require("../middleware/validateAuth");

const router = express.Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.get("/me", authenticateToken, authController.getProfile);

module.exports = router;
