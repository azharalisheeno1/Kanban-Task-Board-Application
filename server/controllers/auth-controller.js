const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    await User.create({ fname, lname, email, password });

    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res
      .status(500)
      .json({
        message: "Server error. Please try again later.",
        accessToken: await User.generateAccessToken(),
        refreshToken: await User.generateRefreshToken(),
      });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });

    res
      .status(200)
      .json({
        message: "User Login Successfully",
        accessToken: await user.generateAccessToken(),
        refreshToken: await user.generateRefreshToken(),
      });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Error in getMe controller:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { register, login, getMe };
