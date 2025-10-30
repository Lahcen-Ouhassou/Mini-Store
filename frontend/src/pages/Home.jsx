import React from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1606813902784-0b04d3b6a4f6?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Gaming Mouse",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1616486782377-5b3c9a5d6db5?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
