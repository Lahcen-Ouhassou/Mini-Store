import React from "react";
import heroImage from "../assets/hero-bg.jpg"; // دير صورة مناسبة ف assets

function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-[950px] flex items-center justify-center text-center text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-blue-400">MiniStore</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
          Discover amazing tech products at unbeatable prices — made just for
          you!
        </p>
        <button className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default Hero;
