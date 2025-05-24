"use client"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { User, Mail, Lock, Eye, EyeOff, Leaf, ArrowRight, Upload, X, CheckCircle } from "lucide-react"
import api from "../api"

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [avatarPreview, setAvatarPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setError("")

    if (name === "avatar") {
      const file = files[0]
      setForm({ ...form, avatar: file })

      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setAvatarPreview(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        setAvatarPreview(null)
      }
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const removeAvatar = () => {
    setForm({ ...form, avatar: null })
    setAvatarPreview(null)
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) fileInput.value = ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("username", form.username)
      formData.append("email", form.email)
      formData.append("password", form.password)
      if (form.avatar) {
        formData.append("avatar", form.avatar)
      }

      const res = await api.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      console.log("Registered:", res.data)
      navigate("/login")
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed"
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
            Join EcoLog
          </h1>
          <p className="text-gray-600 mt-2">Start your sustainable journey today</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/50">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Profile Picture (Optional)</label>
              <div className="flex items-center space-x-4">
                {avatarPreview ? (
                  <div className="relative">
                    <img
                      src={avatarPreview || "/placeholder.svg"}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
                    />
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <label className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors border border-green-200">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm font-medium">Choose Image</span>
                    </div>
                    <input type="file" name="avatar" className="hidden" accept="image/*" onChange={handleChange} />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white/70 backdrop-blur-sm"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white/70 backdrop-blur-sm"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white/70 backdrop-blur-sm"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              <div className="text-xs text-gray-500">Password should be at least 8 characters long</div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Create Account</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-green-600 hover:text-green-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600 hover:text-green-700">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
