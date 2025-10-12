const jwt = require("jsonwebtoken"); // jsonwebtoken (JWT) → كتستعملها باش تولّد “توكن” (Token) فـ تسجيل الدخول باش المستخدم يبقى “مسجّل الدخول” و آمن.
const bcrypt = require("bcryptjs"); // bcryptjs → كتستعملها باش تشفر (تـهاشّي) كلمات السر قبل ما تحطهم فـ MongoDB.
const User = require("../models/userModel");

// Create User (register)
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// ✅ Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Generate Token
    const token = jwt.sign({ id: user._id }, "MY_SECRET_KEY", {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = { createUser, getAllUsers, loginUser, deleteUser };
