// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage"; // Assuming you've already created this page
import ProductPage from "./components/Client/ProductPage";
import BlogDetail from "./components/Client/BlogDetail";
import BreedDetail from "./components/Client/BreedDetail";
import BreedPage from "./components/Client/BreedPage";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route: Redirect to LandingPage for the client */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/breed" element={<BreedPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/blog/:title" element={<BlogDetail />} />
        {/* Breed detail page with dynamic breed name */}
        <Route path="/breeds/:name" element={<BreedDetail />} />
        {/* Blog detail page
        //{/* Admin login page */}
        <Route path="/login" element={<Login />} />
        {/* Protected admin dashboard route */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
