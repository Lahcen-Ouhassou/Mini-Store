const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be positive"],
    },
    description: {
      type: String,
      default: "No description provided",
    },
    category: {
      type: String,
      default: "General",
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/150", // صورة افتراضية
    },
  },
  { timestamps: true } // timestamps kayzid "createdAt" w "updatedAt"
);

// كنصاوبو الموديل باش نقدر نستخدمو ف controller hna fin ky3rf mongoDB compass smiya d collection ** (دائماً Mongoose كيحول الاسم لـ جمع plural)
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
