const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// ==================== Get user's cart (with totalPrice) ====================
const getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
      "name price"
    );

    if (!cart) return res.json({ message: "Your Cart is Empty" });

    // نحسب totalPrice ديناميكياً
    const totalPrice = cart.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    res.json({
      success: true,
      cart: {
        ...cart.toObject(),
        totalPrice,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error fetching Cart", error: error.message });
  }
};

// ==================== Add product to cart ====================
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
    }

    const existingItem = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    res.json({ success: true, message: "✅ Product Added to Cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error Adding to Cart", error: error.message });
  }
};

// ==================== Remove product from Cart ====================
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product"
    );

    if (!cart) {
      return res.status(404).json({ message: "🛒 Cart not found" });
    }

    if (!cart.products || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is already empty" });
    }

    // نحيد المنتج
    cart.products = cart.products.filter((item) => {
      const productIdInCart =
        item.product._id?.toString() || item.product.toString();
      return productIdInCart !== productId;
    });

    // نحفظ التغييرات أولاً
    await cart.save();

    // إذا تولات فارغة نحيد السلة كاملة
    if (cart.products.length === 0) {
      await Cart.deleteOne({ user: req.user._id });
      return res.json({ message: "🗑️ Cart is Empty, Deleted Successfully" });
    }

    res.json({ message: "🗑️ Product Removed From Cart", cart });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error removing product",
      error: error.message,
    });
  }
};

// ==================== Update product quantity in Cart ====================
const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    //(validation) wsh kyn product w quantity (+) mojaba
    if (!productId || !quantity || quantity < 1) {
      return res
        .status(400)
        .json({ message: "❌ Please provide valid productId and quantity" });
    }

    //  نجيب cart ديال المستخدم ( Product model باش نجيبو أسماء المنتجات وأثمانها من .populate() كنستخدم ) .هنا كنلقاو السلة ديال المستخدم اللي داخل حاليا (عن طريق req.user._id، اللي جا من التوكن)
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
      "name price"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not Found" });
    }

    // نلقاو المنتج فـ السلة
    const productInCart = cart.products.find(
      (item) =>
        item.product._id?.toString() === productId ||
        item.product.toString() === productId
    );

    if (!productInCart) {
      return res.status(404).json({ message: "❌ Product not found in cart" });
    }

    // نحدث الكمية
    productInCart.quantity = quantity;

    // نحفظ التغييرات
    await cart.save();

    // نعيد حساب المجموع الكلي
    const totalPrice = cart.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    res.json({
      message: "✅ Cart quantity updated Successfully",
      cart: {
        ...cart.toObject(),
        totalPrice,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error updating cart quantity",
      error: error.message,
    });
  }
};

// ==================== Confirm order (from cart) ====================
const confirmOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
      "price"
    );

    if (!cart || cart.products.length === 0)
      return res.status(400).json({ message: "🛒 Cart is Empty" });

    const totalPrice = cart.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.user._id,
      products: cart.products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice,
    });

    await order.save();

    // بعد الإنشاء نحيد السلة
    await Cart.deleteOne({ user: req.user._id });

    res.status(201).json({
      message: "✅ Order Confirmed Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error Confirming Order",
      error: error.message,
    });
  }
};

// ==================== EXPORT ====================
module.exports = {
  getMyCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  confirmOrder,
};
