// src/pages/AdminDashboard.js
import React from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "../components/Admin/Dashboard";
import Blog from "../components/Admin/Blog";
import Breed from "../components/Admin/Breed";
import Product from "../components/Admin/Product";
import AdminSubscriptions from "../components/Admin/AdminSubscriptions";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
          Admin Panel
        </h2>
        <nav className="flex-1">
          <Link to="dashboard" className="block p-4 hover:bg-gray-700">
            Dashboard
          </Link>
          <Link to="blog" className="block p-4 hover:bg-gray-700">
            Manage Blog
          </Link>
          <Link to="breed" className="block p-4 hover:bg-gray-700">
            Manage Breeds
          </Link>
          <Link to="product" className="block p-4 hover:bg-gray-700">
            Manage Products
          </Link>
          <Link to="AdminSubscriptions" className="block p-4 hover:bg-gray-700">
            Subscription
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="p-4 bg-red-500 hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Routes>
          {/* Default route to show Dashboard */}
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blog" element={<Blog />} />
          <Route path="breed" element={<Breed />} />
          <Route path="product" element={<Product />} />
          <Route path="adminSubscriptions" element={<AdminSubscriptions />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
