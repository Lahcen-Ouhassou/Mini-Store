import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import productsData from "../data/productsData.json"; // نفس الملف اللي كنستعملوه فـ ProductsSection

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const found = productsData.find((item) => item.id === parseInt(id));
    setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div className="text-center text-gray-700 py-20 text-xl">
        Product not found 😢
      </div>
    );
  }

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Suggested products (غير منتجات أخرى مختلفة عن الحالي)
  const suggested = productsData.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Section 1: Product Info */}
      <div className="grid md:grid-cols-2 gap-10 items-center bg-white p-6 rounded-xl shadow-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-semibold text-gray-800  font-bold mb-3">
            {product.title}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl text-blue-600 font-semibold mb-4">
            ${product.price}
          </p>

          <button
            onClick={handleAddToCart}
            className={`${
              added ? "bg-green-600" : "bg-blue-600"
            } text-white font-semibold px-6 py-3 rounded-lg transition duration-300`}
          >
            {added ? "✔ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Section 2: Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 pl-1 ">
          Customer Reviews
        </h2>
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-700 italic">
            "Great product! Very good quality and fast delivery."
          </p>
          <p className="text-gray-500 text-sm mt-2">– User123</p>
        </div>
      </div>

      {/* Section 3: Suggested Products */}
      <div className="mt-12">
        <h2 className="text-2xl text-2xl font-semibold text-gray-800 mb-6 pl-1">
          You may also like
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {suggested.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
