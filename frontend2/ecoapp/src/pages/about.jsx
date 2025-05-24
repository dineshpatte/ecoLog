"use client"
import { Leaf, Target, Users, BarChart3, Award, Lightbulb, ArrowRight, CheckCircle } from "lucide-react"

const About = () => {
  const benefits = [
    {
      icon: Target,
      title: "Personal Impact Tracking",
      description: "Monitor your daily carbon footprint with precision and see real-time improvements",
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Beautiful visualizations help you understand your environmental impact patterns",
    },
    {
      icon: Award,
      title: "Gamified Experience",
      description: "Earn points and achievements for making sustainable choices in your daily life",
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Join thousands of users working together to create a more sustainable future",
    },
  ]

  const steps = [
    {
      step: "01",
      title: "Create Your Account",
      description: "Sign up and start your eco-friendly journey with EcoLog",
    },
    {
      step: "02",
      title: "Log Daily Activities",
      description: "Track your transportation, food, energy usage, and waste management",
    },
    {
      step: "03",
      title: "Monitor Your Progress",
      description: "View your carbon score trends and environmental impact over time",
    },
    {
      step: "04",
      title: "Earn Rewards",
      description: "Get points for sustainable choices and unlock eco-friendly achievements",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-slate-50">
      <div className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-md px-6 py-3 rounded-full border border-green-200">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-medium">About EcoLog</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
              Understanding Your Carbon Footprint
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Every action we take has an environmental impact. EcoLog helps you measure, understand, and reduce your
              carbon footprint for a more sustainable future.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-900">What is a Carbon Score?</h2>

              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Your <span className="font-semibold text-green-700">Carbon Score</span> is a numerical representation
                  of your daily environmental impact, measured in CO₂ equivalent emissions.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Transportation Impact</h3>
                      <p className="text-gray-600">Tracks emissions from cars, public transport, biking, and walking</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Food Consumption</h3>
                      <p className="text-gray-600">Measures impact of meat, dairy, and local produce choices</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Energy Usage</h3>
                      <p className="text-gray-600">Calculates emissions from electricity and gas consumption</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Waste Management</h3>
                      <p className="text-gray-600">Accounts for recycling habits and waste reduction efforts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-green-200 shadow-xl">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="h-12 w-12 text-green-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">Lower Score = Better Impact</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-700">Excellent</span>
                    <span className="text-green-600 font-bold">0-5 CO₂</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium text-gray-700">Good</span>
                    <span className="text-yellow-600 font-bold">5-10 CO₂</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium text-gray-700">Fair</span>
                    <span className="text-orange-600 font-bold">10-15 CO₂</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-gray-700">Needs Improvement</span>
                    <span className="text-red-600 font-bold">15+ CO₂</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How EcoLog Helps Society</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Individual actions create collective impact. When we all track and reduce our carbon footprint, we
              contribute to a healthier planet for future generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/50"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100/80 backdrop-blur-sm rounded-xl group-hover:bg-green-200/80 transition-colors duration-300">
                    <benefit.icon className="h-6 w-6 text-green-700" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Use EcoLog</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with EcoLog is simple. Follow these four easy steps to begin your sustainable journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-green-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-700"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6">Start Making a Difference Today</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of eco-conscious individuals who are already tracking and reducing their environmental
              impact with EcoLog.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg font-semibold border border-white/30"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="/login"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent text-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold border border-white/30"
              >
                <span>Sign In</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
