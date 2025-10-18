const jwt = require("jsonwebtoken"); // jsonwebtoken (JWT) → كتستعملها باش تولّد “توكن” (Token) فـ تسجيل الدخول باش المستخدم يبقى “مسجّل الدخول” و آمن.
const bcrypt = require("bcryptjs"); // bcryptjs → كتستعملها باش تشفر (تـهاشّي) كلمات السر قبل ما تحطهم فـ MongoDB.
const User = require("../models/userModel");

// ==================== Create User (register) ====================
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // تحقق إذا كان المستخدم كاين
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // الافتراضي user
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==================== Get all users  ====================

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({ Count: users.length, users });
};

// ==================== generate Token  ====================

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // jwt.sign() كتصاوب توكن جديد   , process.env.JWT_SECRET → السر اللي كيتستعمل لتشفير التوكن (مكتوب فـ .env).
    expiresIn: "1d", // التوكن صالح لمدة يوم
  });
};

// ==================== login User  ====================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. نلقاو المستخدم بالإيميل
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. نتحقق من كلمة السر
    const isMatch = await bcrypt.compare(password, user.password); // كتقارن الباسوورد اللي دخل المستخدم مع الباسوورد المشفّر المخزّن فـ قاعدة البيانات.
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3. توليد Token
    const token = generateToken(user._id); // هنا كنستعمل الدالة اللي درناها من قبل generateToken() باش نصاوب للمستخدم توكن جديد فيه الـ ID ديالو.

    // 4. نرجعو البيانات + token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==================== Delete User  ====================
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
