import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-white">
        MiniStore
      </Link>

      {/* Links */}
      <div className="grid grid-cols-4 content-center gap-20">
        <Link to="/" className="hover:text-blue-400 transition">
          Home
        </Link>
        <Link to="/products" className="hover:text-blue-400 transition">
          Products
        </Link>
        <Link to="/about" className="hover:text-blue-400 transition">
          About Me
        </Link>
        <Link to="/contact" className="hover:text-blue-400 transition">
          Contact
        </Link>
      </div>

      {/* Login Buttons */}
      <div className="grid grid-cols-2 gap-2">
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
