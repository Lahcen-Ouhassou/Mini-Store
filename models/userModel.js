const mongoose = require("mongoose");

// 1️⃣ نعرف الشكل (schema) user
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

// 2️⃣ نصاوب model باستعمال هاد schema
const User = mongoose.model("User", userSchema);

// 3️⃣ نصدره باش نستعملوه فملفات أخرى
module.exports = User;
