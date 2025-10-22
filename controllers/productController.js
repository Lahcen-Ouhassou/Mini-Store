const Product = require("../models/productModel");

// ==================== CREATE PRODUCT ====================
const createProduct = async (req, res) => {
  try {
    // multer kaydir req.file.path ila tsawrat image
    const imagePath = req.file ? req.file.path : undefined;

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      stock: req.body.stock,
      ...(imagePath && { image: imagePath }), // ila kayna tswira n7otha
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "✅ Product Created Successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error Creating Product:", error);
    res.status(500).json({ message: "❌ Error creating product", error });
  }
};

// ==================== GET ALL PRODUCTS ====================
const getAllProducts = async (req, res) => {
  try {
    // query نجيبو القيم من الـ
    const keyword = req.query.keyword
      ? {
          name: { $regex: req.query.keyword, $options: "i" }, // $options: "i" → كتخلي البحث ما يفرقش بين الحروف الكبيرة والصغيرة
        }
      : {};

    const category = req.query.category
      ? {
          category: req.query.category,
        }
      : {};

    //  واحد object ندمجوهم فـ
    const filter = { ...keyword, ...category }; // Apple والفئة ديالها Phones بحال إلى قلت: جيب المنتجات اللي الاسم فيها

    // Pagination setup
    const page = Number(req.query.page) || 1; // page → رقم الصفحة الحالية (مثلاً 1 أو 2).  (ida ktb lmostkhadim page=2 ay3tih page tanya mktb walo ay3tih qutomatiqument page=1)
    const limit = Number(req.query.limit) || 10; // limit → شحال من منتوج فكل صفحة. (ida ktb lmostakhdim 5 ay3tih limit =5 ila mktbhach ay3tih automatique 10)
    const skip = (page - 1) * limit; // skip → شحال من منتوج نتجاوز باش نوصل لبداية الصفحة الجديدة.

    // نجيب المنتجات
    const products = await Product.find(filter)
      .sort({ createdAt: -1 }) // كيرتبهم من الأحدث إلى الأقدم
      .skip(skip) // .skip(skip) → يتجاوز عدد معين من النتائج.
      .limit(limit); // .limit(limit) → يجيب عدد محدد فقط (مثلاً 10 أو 5).

    //  نجيب العدد الكلي باش نعرف عدد الصفحات
    const total = await Product.countDocuments(filter);

    // ✅ النتيجة
    res.json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "❌ Error while getting products",
      error: error.message,
    });
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
    const { name, price, description, category, stock } = req.body;

    // نحضرو object فيه التحديثات الجديدة
    const updatedData = { name, price, description, category, stock };

    // إذا المستخدم رفع صورة جديدة
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    // نديرو التحديث
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "❌ Product not Found" });

    res.status(200).json({
      message: "✅ Product Updated Successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error Updating Product",
      error: error.message,
    });
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
