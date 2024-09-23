const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Find user by email
    const user = await userModel.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );
    // Send response
    res.status(200).json({
      status: "Success",
      token,
      message: "Login Success",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};

const verify = async (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Verify Success",
    user: req.user,
  });
};

module.exports = { login, verify };
