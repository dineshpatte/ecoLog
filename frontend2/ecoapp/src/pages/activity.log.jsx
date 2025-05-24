"use client"
import { useState } from "react"
import { Car, Bike, Bus, Utensils, Zap, Trash2, Leaf, Plus, X, Calendar } from "lucide-react"
import api from "../api"

const LogActivity = () => {
  const [form, setForm] = useState({
    date: "",
    transport: [{ mode: "", distanceKm: "" }],
    food: {
      meatServings: 0,
      dairyServings: 0,
      vegetarianServings: 0,
      veganServings: 0,
      localProducePercent: 0,
    },
    energy: {
      energySource: "",
      electricityKwh: 0,
      gasKwh: 0,
    },
    waste: {
      wasteType: "",
    },
    otherEcoActions: [],
  })

  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith("food.")) {
      const key = name.split(".")[1]
      setForm((prev) => ({
        ...prev,
        food: { ...prev.food, [key]: Number(value) },
      }))
    } else if (name.startsWith("energy.")) {
      const key = name.split(".")[1]
      setForm((prev) => ({
        ...prev,
        energy: { ...prev.energy, [key]: key === "energySource" ? value : Number(value) },
      }))
    } else if (name.startsWith("waste.")) {
      const key = name.split(".")[1]
      setForm((prev) => ({
        ...prev,
        waste: { ...prev.waste, [key]: value },
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleTransportChange = (e, index) => {
    const { name, value } = e.target
    const newTransport = [...form.transport]
    newTransport[index][name] = name === "distanceKm" ? Number(value) : value
    setForm((prev) => ({ ...prev, transport: newTransport }))
  }

  const addTransport = () => {
    setForm((prev) => ({
      ...prev,
      transport: [...prev.transport, { mode: "", distanceKm: "" }],
    }))
  }

  const removeTransport = (index) => {
    const newTransport = form.transport.filter((_, i) => i !== index)
    setForm((prev) => ({ ...prev, transport: newTransport }))
  }

  const handleEcoActionsChange = (e) => {
    const actions = e.target.value
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean)
    setForm((prev) => ({ ...prev, otherEcoActions: actions }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("/activities/logactivity", form, {
        withCredentials: true,
      })

      const { carbonScore } = response.data.data

      const user = JSON.parse(localStorage.getItem("user"))
      const userId = user?._id
      const key = `carbonHistory_${userId}`
      const history = JSON.parse(localStorage.getItem(key)) || []
      history.push({ date: form.date, carbonScore })
      localStorage.setItem(key, JSON.stringify(history))

      window.dispatchEvent(new CustomEvent("carbonHistoryUpdated"))

      setMessage(`Activity logged! Your carbon score is ${carbonScore}`)
      setTimeout(() => window.location.reload(), 1500)
    } catch (error) {
      setMessage("Failed to log activity: " + (error.response?.data?.message || error.message))
    }
  }

  const getTransportIcon = (mode) => {
    switch (mode) {
      case "car":
        return <Car className="h-4 w-4" />
      case "bike":
        return <Bike className="h-4 w-4" />
      case "public":
        return <Bus className="h-4 w-4" />
      default:
        return <Car className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
            Log Your Eco Activity
          </h1>
          <p className="text-gray-600">Track your daily environmental impact and build sustainable habits</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Activity Date</h2>
            </div>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Car className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Transportation</h2>
            </div>
            <div className="space-y-3">
              {form.transport.map((t, idx) => (
                <div key={idx} className="flex gap-3 items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 flex-1">
                    {getTransportIcon(t.mode)}
                    <select
                      name="mode"
                      value={t.mode}
                      onChange={(e) => handleTransportChange(e, idx)}
                      required
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select transport mode</option>
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                      <option value="walk">Walk</option>
                      <option value="public">Public Transport</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    name="distanceKm"
                    placeholder="Distance (km)"
                    value={t.distanceKm}
                    onChange={(e) => handleTransportChange(e, idx)}
                    min="0"
                    required
                    className="w-32 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => removeTransport(idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTransport}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>Add Transport Mode</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Utensils className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Food Consumption</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["meatServings", "Meat Servings"],
                ["dairyServings", "Dairy Servings"],
                ["vegetarianServings", "Vegetarian Servings"],
                ["veganServings", "Vegan Servings"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}:</label>
                  <input
                    type="number"
                    name={`food.${key}`}
                    value={form.food[key]}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Local Produce Percentage:</label>
              <p className="text-xs text-gray-500 mb-2">
                Percentage of food that was grown/produced within 100 miles of your location
              </p>
              <input
                type="number"
                name="food.localProducePercent"
                value={form.food.localProducePercent}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="0-100%"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Energy Usage</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Energy Source:</label>
                <select
                  name="energy.energySource"
                  value={form.energy.energySource}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="">Select energy source</option>
                  <option value="mostly renewable">Mostly renewable</option>
                  <option value="some renewable">Some renewable</option>
                  <option value="no renewable">No renewable</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Electricity (kWh):</label>
                  <input
                    type="number"
                    name="energy.electricityKwh"
                    value={form.energy.electricityKwh}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gas (kWh):</label>
                  <input
                    type="number"
                    name="energy.gasKwh"
                    value={form.energy.gasKwh}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Trash2 className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Waste Management</h2>
            </div>
            <select
              name="waste.wasteType"
              value={form.waste.wasteType}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            >
              <option value="">Select waste management type</option>
              <option value="mostly recycled">Mostly recycled</option>
              <option value="some recycled">Some recycled</option>
              <option value="no recycling">No recycling</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Other Eco Actions</h2>
            </div>
            <input
              type="text"
              onChange={handleEcoActionsChange}
              placeholder="e.g. used reusable bag, planted tree, composted food waste"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple actions with commas</p>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-2xl hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Log My Eco Activity
            </button>
          </div>

          {message && (
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-semibold">{message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default LogActivity
