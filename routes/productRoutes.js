const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// 🟢 users عاديين يقدرو يشوفو فقط
router.get("/", protect, getAllProducts);
router.get("/:id", protect, getProductById);

// 🔐 admins فقط يقدرو يديرو CRUD
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
