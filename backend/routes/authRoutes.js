// Import Express
const express = require("express");
const router = express.Router();

// Import Controller
const { register,login } = require("../controllers/authController");

// Register API
// POST /api/auth/register
router.post("/register", register);
router.post("/login", login);

// Export Router
module.exports = router;