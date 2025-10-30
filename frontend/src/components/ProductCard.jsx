import React from "react";

function ProductCard({ image, title, price, description }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-450">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-blue-600 font-bold mb-3">${price}</p>
      <p className="text-sm font-semibold text-gray-800 mb-4">{description}</p>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
