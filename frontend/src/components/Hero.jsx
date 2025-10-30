import React from "react";

function Hero() {
  return (
    <section className="bg-white py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to <span className="text-blue-600">MiniStore</span> 🛒
        </h1>
        <p className="text-gray-600 mb-6">
          Discover our latest collection and enjoy the best deals every day!
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default Hero;
