"use client"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LogOut, Leaf, Home, BarChart3, Plus, Info } from "lucide-react"
import api from "../api"

const Navbar = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isLoggedIn = !!localStorage.getItem("accessToken")

  const handleLogout = async () => {
    try {
      await api.post("/users/logout")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      navigate("/login")
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold hover:scale-105 transition-transform duration-200"
            onClick={closeMobileMenu}
          >
            <Leaf className="h-6 w-6 text-emerald-200" />
            <span className="hidden sm:block">EcoLog</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-2">
            <Link
              to="/"
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 flex px-3 gap-2"
              title="Home"
            >
              <Home className="h-5 w-5" />
              <p className="text-sm font-medium">Home</p>
            </Link>

            <Link
              to="/about"
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 flex px-3 gap-2"
              title="About"
            >
              <Info className="h-5 w-5" />
              <p className="text-sm font-medium">About</p>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 px-3 py-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>

                <Link
                  to="/logactivity"
                  className="flex items-center space-x-1 px-3 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors duration-200 shadow-md"
                >
                  <Plus className="h-5 w-5" />
                  <span className="text-sm font-medium">Log Activity</span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-400 rounded-full transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="flex lg:hidden items-center space-x-1">
            <Link to="/" className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200" title="Home">
              <Home className="h-5 w-5" />
            </Link>

            <Link
              to="/about"
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              title="About"
            >
              <Info className="h-5 w-5" />
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                  title="Dashboard"
                >
                  <BarChart3 className="h-5 w-5" />
                </Link>

                <Link
                  to="/logactivity"
                  className="p-2 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors duration-200 shadow-md"
                  title="Log Activity"
                >
                  <Plus className="h-5 w-5" />
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 text-xs font-medium hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-3 py-1 text-xs font-medium bg-emerald-500 hover:bg-emerald-400 rounded-full transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
