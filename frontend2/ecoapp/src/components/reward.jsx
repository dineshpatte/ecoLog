"use client"
import { useEffect, useState } from "react"
import axios from "axios"

const Rewards = ({ onTotalUpdate }) => {
  const [reward, setReward] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchReward = async () => {
      setLoading(true)
      setError("")
      try {
        const token = localStorage.getItem("accessToken")
        if (!token) {
          setError("Not authenticated. Please log in.")
          setLoading(false)
          return
        }

        const res = await axios.post(
          "http://localhost:3000/api/v1/rewards/check-daily-reward",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )

        if (res.data.data) {
          const today = new Date().toISOString().slice(0, 10)
          const newReward = res.data.data

          const storedRaw = localStorage.getItem("dailyRewards")
          const stored = storedRaw ? JSON.parse(storedRaw) : {}
          stored[today] = newReward
          localStorage.setItem("dailyRewards", JSON.stringify(stored))

          setReward(newReward)
          setMessage(res.data.message)
          if (onTotalUpdate) {
            const sum = Object.values(stored).reduce(
              (acc, reward) => acc + (typeof reward?.points === "number" ? reward.points : 0),
              0,
            )
            onTotalUpdate(sum)
          }
        } else {
          setReward(null)
          setMessage(res.data.message || "No rewards available")
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error fetching reward")
      } finally {
        setLoading(false)
      }
    }

    fetchReward()
  }, [onTotalUpdate])

  if (loading) return <p className="text-center text-gray-500">Loading rewards...</p>
  if (error) return <p className="text-center text-red-600">{error}</p>

  return (
    <div className="max-w-md mx-auto p-6 bg-green-50 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-800 text-center"> Rewards</h2>
      {reward ? (
        <div className="bg-green-100 p-4 rounded-md shadow-inner">
          <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
          <p className="mb-2 text-green-900">{reward.description}</p>
          <p className="font-semibold">
            Points: <span className="text-green-700">{reward.points}</span>
          </p>
        </div>
      ) : (
        <p className="text-center text-green-700">{message}</p>
      )}
    </div>
  )
}

export default Rewards

