import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        MiniStore
      </Link>

      {/* Main Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/products" className="text-gray-700 hover:text-blue-600">
          Products
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">
          About
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600">
          Contact
        </Link>
      </div>

      {/* Right side: Auth + Cart */}
      <div className="flex items-center gap-5">
        {/* Sign Up & Login buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/signup"
            className="bg-white border border-gray-300 text-gray-900 font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 transition text-center"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition text-center"
          >
            Login
          </Link>
        </div>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="relative flex items-center text-gray-700 hover:text-blue-600"
        >
          <ShoppingCart size={26} />
          {/* عدد المنتجات (مؤقتًا ثابت، وغادي نربطوه بالـ Context) */}
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1">
            2
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
