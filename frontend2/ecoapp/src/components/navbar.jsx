import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold">
          EcoLog 🌿
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/logactivity" className="hover:underline">
            Log Activity
          </Link>
          <Link to="/rewards" className="hover:underline">
            Rewards
          </Link>
          <Link to="/tips" className="hover:underline">
            Tips
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



