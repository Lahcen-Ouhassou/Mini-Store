import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-5">
      <h2 className="text-lg font-semibold mb-6">Dashboard Menu</h2>
      <nav className="flex flex-col space-y-3">
        <Link
          to="/admin"
          className="hover:bg-gray-700 px-3 py-2 rounded transition"
        >
          Overview
        </Link>
        <Link
          to="/admin/products"
          className="hover:bg-gray-700 px-3 py-2 rounded transition"
        >
          Products
        </Link>
        <Link
          to="/admin/orders"
          className="hover:bg-gray-700 px-3 py-2 rounded transition"
        >
          Orders
        </Link>
        <Link
          to="/admin/users"
          className="hover:bg-gray-700 px-3 py-2 rounded transition"
        >
          Users
        </Link>
        <Link
          to="/admin/settings"
          className="hover:bg-gray-700 px-3 py-2 rounded transition"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
