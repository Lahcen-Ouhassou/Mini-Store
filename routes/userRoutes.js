const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  deleteUser,
} = require("../controllers/userController");

// ➕ إضافة مستخدم
router.post("/", createUser);

// 📋 عرض جميع المستخدمين
router.get("/", getUsers);

// 🗑️ حذف مستخدم
router.delete("/:id", deleteUser);

module.exports = router;
