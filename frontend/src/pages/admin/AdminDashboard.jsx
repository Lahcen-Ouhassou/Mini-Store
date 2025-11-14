import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

// Pages
import Overview from "./Overview";
import AdminProducts from "./Products";
import AdminOrders from "./Orders";
import AdminUsers from "./Users";
import AdminSettings from "./Settings";

function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1">
        <AdminNavbar />

        <div className="p-6">
          <Routes>
            <Route path="overview" element={<Overview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
