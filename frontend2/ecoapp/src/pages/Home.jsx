"use client"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { TrendingDown, Award, BarChart3, Plus, Target, ArrowRight, Sparkles } from "lucide-react"

const Home = () => {
  const [username, setUsername] = useState("")
  const isLoggedIn = !!localStorage.getItem("accessToken")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUsername(user.username)
      } catch (err) {
        console.error("Error parsing user from localStorage", err)
      }
    }
  }, [])

  const features = [
    {
      icon: TrendingDown,
      title: "Track Carbon Footprint",
      description: "Monitor your daily environmental impact with precision",
    },
    {
      icon: Award,
      title: "Earn Eco Rewards",
      description: "Get points and achievements for sustainable choices",
    },
    {
      icon: BarChart3,
      title: "Visual Analytics",
      description: "Beautiful charts showing your environmental progress",
    },
    {
      icon: Target,
      title: "Set Green Goals",
      description: "Challenge yourself with personalized eco targets",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-slate-50">
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
                Welcome{username ? `, ${username}` : ""}!
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Track your environmental impact, make sustainable choices, and help save our planet one step at a time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/logactivity"
                    className="group flex items-center space-x-2 px-8 py-4 bg-white/20 backdrop-blur-md text-green-800 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-white/30"
                  >
                    <Plus className="h-5 w-5" />
                    <span className="font-semibold">Log Today's Activity</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-8 py-4 bg-white/20 backdrop-blur-md text-green-800 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg border border-white/30"
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span className="font-semibold">View Dashboard</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group flex items-center space-x-2 px-8 py-4 bg-white/20 backdrop-blur-md text-green-800 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-white/30"
                  >
                    <Sparkles className="h-5 w-5" />
                    <span className="font-semibold">Start Your Eco Journey</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-8 py-4 bg-white/20 backdrop-blur-md text-green-800 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg border border-white/30"
                  >
                    <span className="font-semibold">Sign In</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EcoLog?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools to help you understand and reduce your environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/50"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100/80 backdrop-blur-sm rounded-xl group-hover:bg-green-200/80 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-green-700" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-700"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Start tracking your environmental impact and make sustainable choices for a better future.
            </p>
            {!isLoggedIn && (
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg font-semibold border border-white/30"
              >
                <span>Get Started Today</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
