const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getMyCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  confirmOrder,
} = require("../controllers/cartController");

// Users
router.get("/", protect, getMyCart);
router.post("/", protect, addToCart);
router.delete("/remove", protect, removeFromCart);
router.put("/update", protect, updateCartQuantity);
router.post("/confirm", protect, confirmOrder);



module.exports = router;
