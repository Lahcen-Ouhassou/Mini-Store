const User = require("../models/userModel");

// ➕ إنشاء مستخدم جديد
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const newUser = new User({ name, email, age });
    await newUser.save();

    res.status(201).json({
      message: "✅ User created successfully!",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error creating user",
      error: error.message,
    });
  }
};

// 📋 عرض جميع المستخدمين
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error fetching users", error: error.message });
  }
};

// 🗑️ حذف مستخدم
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "❌ User not found" });

    res.json({ message: "✅ User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error deleting user", error: error.message });
  }
};

module.exports = { createUser, getUsers, deleteUser };
