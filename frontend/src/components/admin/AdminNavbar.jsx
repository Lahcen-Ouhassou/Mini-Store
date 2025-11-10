import React from "react";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-300">Admin</span>
        <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
