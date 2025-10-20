const Product = require("../models/productModel");

// ==================== CREATE PRODUCT ====================
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body;

    // التحقق من الحقول الأساسية
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are Required" });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
      image,
    });

    await newProduct.save();
    res.status(201).json({
      message: "✅ Product Created Successfully!",
      product: newProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error creating Product", error: error.message });
  }
};

// ==================== GET ALL PRODUCTS ====================
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error fetching Products", error: error.message });
  }
};

// ==================== GET ONE PRODUCT BY ID ====================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "❌ Product not Found" });

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error fetching Product", error: error.message });
  }
};

// ==================== UPDATE PRODUCT ====================
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "❌ Product not Found" });

    res.status(200).json({
      message: "✅ Product Updated Successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error updating Product", error: error.message });
  }
};

// ==================== DELETE PRODUCT ====================
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "❌ Product not Found" });

    res.status(200).json({ message: "🗑️ Product Deleted Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error deleting Product", error: error.message });
  }
};

// ==================== EXPORT ====================
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
