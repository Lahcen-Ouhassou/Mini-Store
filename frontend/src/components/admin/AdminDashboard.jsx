import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="p-6 bg-gray-100 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
