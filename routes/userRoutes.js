const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const newUser = new User({
      name,
      email,
      age,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "✅ User created successfully!", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error creating user", error: error.message });
  }
});

module.exports = router;
