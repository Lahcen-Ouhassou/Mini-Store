import React from "react";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white">MiniStore</h1>
      <div class="grid grid-cols-4 content-center gap-20">
        <div>
          <a href="">Home</a>
        </div>
        <div>
          <a href="">Products</a>
        </div>
        <div>
          <a href="">About Me</a>
        </div>
        <div>
          <a href="">Contact</a>
        </div>
      </div>
      {/* Login Button */}
      <div class="grid grid-cols-2 gap-2">
        <button className="bg-white text-gray-900 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition">
          Sign Up
        </button>
        <button className="bg-white text-gray-900 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition">
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
