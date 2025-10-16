const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  loginUser,
  deleteUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware"); // ⬅️ استوردنا middleware

router.post("/login", loginUser);
router.post("/register", createUser);
router.get("/", protect, getAllUsers); // ⬅️ هنا زدنا middleware

router.delete("/:id", protect, deleteUser);

module.exports = router;
