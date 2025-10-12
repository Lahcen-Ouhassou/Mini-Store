const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

module.exports = router;
