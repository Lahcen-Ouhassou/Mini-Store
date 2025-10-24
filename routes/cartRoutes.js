const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getMyCart,
  addToCart,
  confirmOrder,
} = require("../controllers/cartController");

// 🟢 Get user's cart
router.get("/", protect, getMyCart);

// 🟢 Add product to cart
router.post("/", protect, addToCart);

// 🟢 Confirm order (from cart)
router.post("/confirm", protect, confirmOrder);

module.exports = router;
