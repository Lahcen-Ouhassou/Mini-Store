const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// 🟢 users عاديين يقدرو يشوفو فقط
router.get("/", protect, getAllProducts);
router.get("/:id", protect, getProductById);

// 🔐 admins فقط يقدرو يديرو CRUD
router.post("/", protect, adminOnly, upload.single("image"), createProduct);
router.put("/:id", protect, adminOnly, upload.single("image"), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
