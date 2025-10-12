const User = require("../models/userModel");

// إنشاء مستخدم جديد
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // تحقق من الحقول
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // تحقق واش الإيميل موجود من قبل
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: "✅ User Registered Successfully!",
      user: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error registering user", error: error.message });
  }
};

// عرض جميع المستخدمين
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ count: users.length, users });
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

module.exports = { registerUser, getAllUsers, deleteUser };
