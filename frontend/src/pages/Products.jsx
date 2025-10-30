import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import headphones from "../assets/headphones.jpg";
import watch from "../assets/watch.jpg";
import speaker from "../assets/speaker.jpg";

function Products() {
  const allProducts = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: 49.99,
      category: "Audio",
      image: headphones,
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 79.99,
      category: "Wearable",
      image: watch,
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      price: 39.99,
      category: "Audio",
      image: speaker,
    },
    {
      id: 4,
      title: "Fitness Tracker",
      price: 59.99,
      category: "Wearable",
      image: watch,
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProducts = allProducts.filter((product) => {
    const matchCategory = filter === "All" || product.category === filter;
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          All Products
        </h2>

        {/* 🔍 Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded-lg px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Audio">Audio</option>
            <option value="Wearable">Wearable</option>
          </select>
        </div>

        {/* 🛍️ Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No products found 😢
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;
