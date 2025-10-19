const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  loginUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  forgotPassword,
} = require("../controllers/userController");



// ✅ الاستيراد الصحيح
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.post("/register", createUser);
router.get("/profile", protect, getMyProfile);
router.put("/updateprofile", protect, updateMyProfile);
router.post("/forgot-password",forgotPassword)

// ✅ غير admin يقدر يشوف أو يمسح
router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;
