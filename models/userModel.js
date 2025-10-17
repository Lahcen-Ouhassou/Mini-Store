const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    // 🟢 الدور (admin أو user)
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user", // أي مستخدم جديد كيكون user
    },
  },
  { timestamps: true }
);


// نصاوب model باستعمال هاد schema // نصدره باش نستعملوه فملفات أخرى
module.exports = mongoose.model("User", userSchema);
