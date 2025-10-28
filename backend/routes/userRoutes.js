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
  resetPassword,
  deleteMyAccount,
} = require("../controllers/userController");

// Get function verify JWT(protect) w verify role admin (adminOnly)
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Users
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", protect, getMyProfile);
router.put("/updateprofile", protect, updateMyProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.delete("/delete-me", protect, deleteMyAccount);

// Only Admin
router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;
