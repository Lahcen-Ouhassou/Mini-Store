import { Link } from "react-router-dom";

function ProductCard({ id, image, title, price, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-700 mb-2">{description.slice(0, 60)}...</p>
      <p className="text-blue-600 font-bold mb-4">${price}</p>

      {/* زر التفاصيل */}
      <Link
        to={`/products/${id}`}
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;
