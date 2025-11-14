// src/Component/AdminLayout.js
import React from "react";
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white h-screen shadow-md p-6 flex flex-col gap-4 fixed left-0 top-0 pt-24">
        <Link
          to="/additems"
          className="border border-gray-300 rounded-md py-3 px-4 text-center text-gray-700 hover:bg-gray-100 hover:border-black transition"
        >
          Add Items
        </Link>

        <Link
          to="/list"
          className="border border-gray-300 rounded-md py-3 px-4 text-center text-gray-700 hover:bg-gray-100 hover:border-black transition"
        >
          List
        </Link>

        <Link
          to="/orderitem"
          className="border border-gray-300 rounded-md py-3 px-4 text-center text-gray-700 hover:bg-gray-100 hover:border-black transition"
        >
          Orders
        </Link>
      </aside>

      {/* Main Section */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <nav className="fixed top-0 left-64 w-[calc(100%-16rem)] z-50 flex items-center justify-between bg-white px-6 py-4 shadow-md">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="h-10 w-auto px-6" />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition font-medium"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Page Content */}
        <main className="pt-24 px-10">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
