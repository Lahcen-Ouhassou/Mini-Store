const Product = require("../models/productModel");

// ✅ إنشاء منتج جديد
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, year, inStock } = req.body;
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      year,
      inStock,
    });
    await newProduct.save();
    res.status(201).json({
      message: "✅ Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error creating product", error: error.message });
  }
};


// ✅ عرض جميع المنتجات
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching products", error: error.message });
  }
};


// ✅ عرض منتج واحد بواسطة ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching product", error: error.message });
  }
};


// ✅ تحديث منتج
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({
      message: "✅ Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error updating product", error: error.message });
  }
};


// ✅ حذف منتج
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "🗑️ Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error deleting product", error: error.message });
  }
};


module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
