import React, { useState } from "react"; // تخلينا نخزنو قيم متغيرة (مثلاً الكلمة اللي كتبها المستخدم أو الفئة اللي  — useState
import ProductCard from "../components/ProductCard";
import headphones from "../assets/headphones.jpg";
import watch from "../assets/watch.jpg";
import speaker from "../assets/speaker.jpg";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      category: "Audio",
      price: 49.99,
      image: headphones,
      description: "High quality wireless headphones with noise cancellation.",
    },
    {
      id: 2,
      title: "Smart Watch",
      category: "Accessories",
      price: 79.99,
      image: watch,
      description: "Modern smartwatch with fitness tracking features.",
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      category: "Audio",
      price: 39.99,
      image: speaker,
      description: "Portable speaker with deep bass and clear sound.",
    },
  ];

  // بحث + فلترة
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          All Products
        </h2>

        {/* الفلترة و البحث */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          {/* search */}
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // searchTermكتبدل onChange  .كل مرة المستخدم يكتب فيها شي حرف
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* catrgory */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Audio">Audio</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/*  hna knchuf wsh kynin products bla filter ida kaynin n3rdhum la mkyninch ndir "No products found" */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map(
              (
                product //  filteredProducts كتدور على كل منتوج فلائحة map()
              ) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                />
              )
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}

export default Products;
