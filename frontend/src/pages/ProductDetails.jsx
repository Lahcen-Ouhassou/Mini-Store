import React from "react";
import { useParams } from "react-router-dom";
import headphones from "../assets/headphones.jpg";
import watch from "../assets/watch.jpg";
import speaker from "../assets/speaker.jpg";

function ProductDetails() {
  const { id } = useParams();

  // المنتجات التجريبية (نفسها من ProductsSection)
  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 49.99,
      image: headphones,
      description:
        "Experience high-quality sound with our wireless headphones. Perfect for music lovers who value comfort and style.",
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 79.99,
      image: watch,
      description:
        "Track your fitness, receive notifications, and look stylish with our latest smart watch.",
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      price: 39.99,
      image: speaker,
      description:
        "Enjoy powerful sound anywhere with our portable Bluetooth speaker. Compact design, rich bass, and long battery life.",
    },
  ];

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center text-red-600 py-16">Product not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-97 object-cover rounded-lg shadow-md"
        />

        {/* Product Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {product.title}
          </h2>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl text-blue-600 font-semibold mb-6">
            ${product.price}
          </p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
