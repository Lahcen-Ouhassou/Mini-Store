const Order = require("../models/Order");

// 🟢 إنشاء طلب جديد
const createOrder = async (req, res) => {
  try {
    const { products, totalPrice } = req.body;

    if (!products || products.length === 0)
      return res.status(400).json({ message: "❌ No products in order" });

    const order = await Order.create({
      user: req.user._id, // جاي من الـ middleware ديال protect
      products,
      totalPrice,
    });

    res.status(201).json({
      message: "✅ Order created successfully",
      order,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error creating order", error: error.message });
  }
};

// 🔵 جلب الطلبات ديال المستخدم
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

// 🔴 خاص بالأدمن: جميع الطلبات
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

// 🟠 تحديث حالة الطلب
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
