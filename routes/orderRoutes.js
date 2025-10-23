const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// 🔒 المستخدم يقدر يدير order ويشوف طلباتو
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getUserOrders);

// 👑 الأدمن فقط يقدر يشوف جميع الطلبات ويحدثها
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;
