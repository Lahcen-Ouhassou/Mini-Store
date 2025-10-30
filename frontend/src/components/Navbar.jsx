import React from "react";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white">MiniStore</h1>

      {/* Login Button */}
      <button className="bg-white text-gray-900 font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition">
        Login
      </button>
    </nav>
  );
}

export default Navbar;
