// Import Express
const express = require("express");
const router = express.Router();

// Import Controller
const { register } = require("../controllers/authController");

// Register API
// POST /api/auth/register
router.post("/register", register);

// Export Router
module.exports = router;