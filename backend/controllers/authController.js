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


// ===============================
// Login User
// ===============================

const login = async (req, res) => {
  try {

    // Get email & password
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // User not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Login Success
    res.status(200).json({
      success: true,
      message: "Login Successful",
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Export Controller
module.exports = { register,login, };