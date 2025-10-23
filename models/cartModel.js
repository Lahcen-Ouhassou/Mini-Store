const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // كل سلة مربوطة بمستخدم
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, // كل عنصر فالسلة عندو منتوج
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number, // الكمية ديال داك المنتوج
        default: 1,
        min: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0, // غانحسبوه من الثمن ديال المنتجات × الكمية
  },
});

module.exports = mongoose.model("Cart", cartSchema);
