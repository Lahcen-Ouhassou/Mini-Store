import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-500">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <Link
            to="/admin"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <Package size={20} /> Products
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <ShoppingBag size={20} /> Orders
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <Users size={20} /> Users
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
