"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, ArrowLeft, CheckCircle, AlertCircle, Shield, Key } from "lucide-react"
import api from "../api"

const ChangePassword = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setMessage("")
    setError("")
  }

  const passwordsMatch = form.newPassword === form.confirmPassword && form.confirmPassword !== ""

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    // Simple validation - only check if passwords match
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const res = await api.post("/users/changepassword", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      })

      setMessage(res.data.message || "Password changed successfully!")
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // Redirect after successful change
      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white/70 backdrop-blur-md rounded-full hover:bg-white/90 transition-colors border border-white/50 shadow-md"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
                Change Password
              </h1>
              <p className="text-gray-600">Update your account security</p>
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/50">
          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <p className="text-green-700 font-medium">{message}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="oldPassword"
                  value={form.oldPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white/70 backdrop-blur-sm"
                  placeholder="Enter your current password"
                  required
                />
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white/70 backdrop-blur-sm"
                  placeholder="Enter your new password"
                  required
                />
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-colors bg-white/70 backdrop-blur-sm ${
                    form.confirmPassword
                      ? passwordsMatch
                        ? "border-green-300 focus:border-green-500"
                        : "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-green-500"
                  }`}
                  placeholder="Confirm your new password"
                  required
                />
              </div>

              {/* Password Match Indicator */}
              {form.confirmPassword && (
                <div className="flex items-center space-x-2 text-xs">
                  {passwordsMatch ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-red-600">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isLoading || !passwordsMatch}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    <span>Change Password</span>
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
          </form>
        </div>

        {/* Security Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-blue-100 rounded-full mt-0.5">
              <Shield className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Password Security Tips:</p>
              <ul className="space-y-1 text-xs">
                <li>• Use a mix of letters, numbers, and symbols for better security</li>
                <li>• Avoid using personal information or common words</li>
                <li>• Don't reuse passwords from other accounts</li>
                <li>• Consider using a password manager for better security</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
