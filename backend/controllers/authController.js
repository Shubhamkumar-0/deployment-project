// Import User Model
const User = require("../models/User");

// Register Controller
const register = async (req, res) => {
  try {
    // Get data from frontend
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
    });

    // Save user in MongoDB
    await newUser.save();

    // Success Response
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });

  } catch (error) {
    // Error Response
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Export Controller
module.exports = { register };