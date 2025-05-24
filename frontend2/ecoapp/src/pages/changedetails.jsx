"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Save, ArrowLeft, Leaf, CheckCircle, AlertCircle } from "lucide-react"
import api from "../api"

const UpdateAccount = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setCurrentUser(user)
        setForm({
          username: user.username || "",
          email: user.email || "",
        })
      } catch (err) {
        console.error("Error parsing user data:", err)
      }
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setMessage("")
    setError("")
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    setIsLoading(true)

    try {
      const res = await api.put("/users/updatedetails", form)

      if (res.data.data) {
        localStorage.setItem("user", JSON.stringify(res.data.data))
        setCurrentUser(res.data.data)
      }

      setMessage(res.data.message || "Account updated successfully!")

      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || "Update failed")
    } finally {
      setIsLoading(false)
    }
  }

  const hasChanges = currentUser && (form.username !== currentUser.username || form.email !== currentUser.email)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white/70 backdrop-blur-md rounded-full hover:bg-white/90 transition-colors border border-white/50 shadow-md"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
                Update Account
              </h1>
              <p className="text-gray-600">Manage your account information</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/50">
          {currentUser && (
            <div className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-sm font-medium text-green-800 mb-2">Current Account Information</h3>
              <div className="space-y-1 text-sm text-green-700">
                <p>
                  <span className="font-medium">Username:</span> {currentUser.username}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {currentUser.email}
                </p>
              </div>
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <p className="text-green-700 font-medium">{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white/70 backdrop-blur-sm"
                  placeholder="Enter new username"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Choose a unique username for your account</p>
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
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white/70 backdrop-blur-sm"
                  placeholder="Enter new email address"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">We'll send important updates to this email</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading || !hasChanges}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Update Account</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>

            {!hasChanges && currentUser && (
              <p className="text-sm text-gray-500 text-center">
                Make changes to your username or email to enable the update button
              </p>
            )}
          </form>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-blue-100 rounded-full mt-0.5">
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Important Notes:</p>
              <ul className="space-y-1 text-xs">
                <li>• Changing your email may require verification</li>
                <li>• Your username must be unique across the platform</li>
                <li>• You'll be redirected to your dashboard after successful update</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateAccount
