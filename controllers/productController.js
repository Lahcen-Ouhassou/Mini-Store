const Product = require("../models/productModel");

// ➕ إضافة منتج جديد
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📋 جلب جميع المنتجات
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// 🗑️ حذف منتج
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createProduct, getProducts, deleteProduct };
