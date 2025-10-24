const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// ==================== Create Order ====================
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ خذناها من الـ token
    const { products } = req.body;

    let totalPrice = 0;

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      totalPrice += product.price * item.quantity;
    }

    const newOrder = new Order({
      user: userId, // ✅ استعملنا user من الـ token
      products,
      totalPrice,
    });

    await newOrder.save();

    res.status(201).json({
      message: "✅ Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error creating order",
      error: error.message,
    });
  }
};

// ==================== Get User Orders ====================
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product",
      "name price"
    );
    res.json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error getting user orders", error: error.message });
  }
};

// ==================== get All Orders ====================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");

    res.json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error getting all orders", error: error.message });
  }
};

// ==================== update Order Status(admin) ====================
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ message: "✅ Order status updated", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error updating order", error: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};
