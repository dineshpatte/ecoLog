import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // Lucide logout icon
import api from "../api"; // Axios instance

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold">
          EcoLog 🌿
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:underline">Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/logactivity" className="hover:underline">Log Activity</Link>
              <button
                onClick={handleLogout}
                title="Logout"
                className="hover:text-red-300"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
