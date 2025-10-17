const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// 🧱 الميدلواير ديال الحماية
const protect = require("../middleware/authMiddleware"); // يتحقق من JWT
const admin = require("../middleware/adminMiddleware"); // يتحقق من role = admin

// 🟢 أي واحد (user أو admin) يقدر يشوف المنتجات
router.get("/", protect, getAllProducts);
router.get("/:id", protect, getProductById);

// 🔐 هادو غير admin يقدر يديرهم
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
