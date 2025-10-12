const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  loginUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/register", createUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

module.exports = router;
