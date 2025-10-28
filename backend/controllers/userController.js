const jwt = require("jsonwebtoken"); // jsonwebtoken (JWT) → كتستعملها باش تولّد “توكن” (Token) فـ تسجيل الدخول باش المستخدم يبقى “مسجّل الدخول” و آمن.
const bcrypt = require("bcryptjs"); // bcryptjs → كتستعملها باش تشفر (تـهاشّي) كلمات السر قبل ما تحطهم فـ MongoDB.
const crypto = require("crypto");
const nodemailer = require("nodemailer");
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
      .json({ message: "User Created Successfully", user: newUser });
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
      return res.status(400).json({ message: "User not Found" });
    }

    // 2. نتحقق من كلمة السر
    const isMatch = await bcrypt.compare(password, user.password); // كتقارن الباسوورد اللي دخل المستخدم مع الباسوورد المشفّر المخزّن فـ قاعدة البيانات.
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // 3. توليد Token
    const token = generateToken(user._id); // هنا كنستعمل الدالة اللي درناها من قبل generateToken() باش نصاوب للمستخدم توكن جديد فيه الـ ID ديالو.

    // 4. نرجعو البيانات + token
    res.status(200).json({
      message: "Login Successful",
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
      return res.status(404).json({ message: "User not Found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting User", error });
  }
};

// ==================== get My Profile  ====================
const getMyProfile = async (req, res) => {
  try {
    const user = req.user; // 🧠 req.user جاي من protect middleware
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ==================== Update My Profile  ====================
const updateMyProfile = async (req, res) => {
  try {
    // req.user جاي من protect middleware (loginيعني اللي دير )
    const user = req.user;

    // نجيب البيانات الجديدة من body
    const { name, email, password } = req.body;

    // نبدل غير الحوايج اللي مبعوثين
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    // MongoDBنحفظ التغييرات فـ
    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile Updated Successfully!",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ==================== Forgot Password  ====================
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found with this Email" });

    // 1️⃣ إنشاء توكن عشوائي (raw)
    const resetToken = crypto.randomBytes(20).toString("hex"); // كنستعمل مكتبة crypto باش نصايبو token عشوائي (سلسلة حروف فريدة).

    // 2️⃣ تشفير التوكن قبل التخزين (حماية)
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // ساعة
    await user.save();

    // 3️⃣ إعداد الإيميل
    const resetURL = `http://localhost:3000/reset-password/${resetToken}`; // نرسل النسخة الأصلية (غير مشفرة)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password Reset.</p>
        <p>Click here to reset your Password:</p>
        <a href="${resetURL}">${resetURL}</a>
        <p>This link will expire in 1 Hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email Sent Successfully!" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==================== Reset Password  ====================
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // نحولو token العادي إلى hashed نفس الطريقة ديال التخزين
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // hashed token نلقاو المستخدم اللي عندو نفس
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // ونتأكدو أن الوقت مازال صالح ($gt: Date.now() = أكبر من الوقت الحالي).
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired Token" });
    }

    // نبدلو الباسورد و نحيدو التوكن القديم
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password Reset Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ==================== Delete my account ====================
const deleteMyAccount = async (req, res) => {
  try {
    // req.user كيجينا من middleware protect (المستخدم اللي داخل فعلاً)
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    await User.deleteOne({ _id: req.user._id });

    res
      .status(200)
      .json({ message: "Your Account has been Deleted Successfully" });
  } catch (error) {
    console.error("Error Deleting Account:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  loginUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  forgotPassword,
  resetPassword,
  deleteMyAccount,
};
