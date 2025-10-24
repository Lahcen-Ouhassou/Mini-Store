const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// 🟢 Get user's cart (with totalPrice)
const getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
      "name price"
    );

    if (!cart) return res.json({ message: "🛒 Your cart is empty" });

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
      .json({ message: "❌ Error fetching cart", error: error.message });
  }
};

// 🟢 Add product to cart
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

    res.json({ success: true, message: "✅ Product added to cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error adding to cart", error: error.message });
  }
};

// 🟢 Confirm order (from cart)
const confirmOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
      "price"
    );

    if (!cart || cart.products.length === 0)
      return res.status(400).json({ message: "🛒 Cart is empty" });

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
      message: "✅ Order confirmed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error confirming order",
      error: error.message,
    });
  }
};

module.exports = {
  getMyCart,
  addToCart,
  confirmOrder,
};
