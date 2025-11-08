import { NavLink } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Users, Settings } from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-5">
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          <LayoutDashboard /> Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          <ShoppingBag /> Products
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          <LayoutDashboard /> Orders
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          <Users /> Users
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          <Settings /> Settings
        </NavLink>
      </nav>
    </aside>
  );
}
