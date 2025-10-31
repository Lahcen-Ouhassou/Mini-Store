import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ id, image, title, price, description }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 flex flex-col">
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
      </Link>

      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-blue-600 font-bold mb-2">${price}</p>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

      <div className="mt-auto flex justify-between items-center">
        <Link
          to={`/products/${id}`}
          className="text-blue-600 font-medium hover:underline"
        >
          View Details
        </Link>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
