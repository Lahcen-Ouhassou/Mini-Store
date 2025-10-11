const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  category: {
    type: String,
    default: "General",
  },
  year: {
    type: Number,
    required: [true, "Product year is required"],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

// كنصاوبو الموديل باش نقدر نستخدمو ف controller
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
