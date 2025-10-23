const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// ====================  Add product to cart ====================
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // من التوكن
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "❌ Product not found" });
    }

    // نجيب السلة ديال المستخدم أو نخلق وحدة جديدة
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    // نشوف واش المنتوج كاين ديجا فالسلة
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity; // نزيد الكمية
    } else {
      cart.items.push({ product: productId, quantity });
    }

    // نحسب الثمن الإجمالي
    cart.totalPrice = await calculateTotal(cart.items);

    await cart.save();

    res.status(200).json({
      message: "✅ Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error adding to cart",
      error: error.message,
    });
  }
};

// ==================== calculate Total ====================
const calculateTotal = async (items) => {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    total += product.price * item.quantity;
  }
  return total;
};

// ====================  Get user's cart ====================
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price"
    );

    if (!cart) {
      return res.json({ message: "🛒 Your cart is empty" });
    }

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error getting cart",
      error: error.message,
    });
  }
};

// ====================  Update quantity cart ====================
const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;
    cart.totalPrice = await calculateTotal(cart.items);
    await cart.save();

    res.json({
      message: "✅ Quantity updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error updating quantity",
      error: error.message,
    });
  }
};

// ====================  Remove item cart ====================
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);

    cart.totalPrice = await calculateTotal(cart.items);
    await cart.save();

    res.json({
      message: "✅ Product removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error removing product",
      error: error.message,
    });
  }
};

module.exports = { addToCart, getCart, updateQuantity, removeFromCart };
