const mongoose = require("mongoose");

// 1️⃣ نعرف الشكل (schema) user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // خاص يكون الاسم ضروري
  },
  email: {
    type: String,
    required: true,
    unique: true, // ما يكونش نفس الإيميل مكرر
  },
  age: {
    type: Number,
    default: 18, // إلى ما عطيناهش سنّ، يدير 18
  },
});

// 2️⃣ نصاوب model باستعمال هاد schema
const User = mongoose.model("User", userSchema);

// 3️⃣ نصدره باش نستعملوه فملفات أخرى
module.exports = User;
