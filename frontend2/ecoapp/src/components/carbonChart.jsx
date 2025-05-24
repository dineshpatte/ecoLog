"use client"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Filler,
} from "chart.js"

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Filler)

const CarbonTrendChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    const loadHistory = () => {
      const user = JSON.parse(localStorage.getItem("user"))
      const userId = user?._id
      const historyKey = userId ? `carbonHistory_${userId}` : "carbonHistory"
      const history = JSON.parse(localStorage.getItem(historyKey)) || []

      const sorted = history.sort((a, b) => new Date(a.date) - new Date(b.date))
      const labels = sorted.map((entry) => new Date(entry.date).toLocaleDateString())
      const scores = sorted.map((entry) => Number(entry.carbonScore ?? 0))

      setChartData({
        labels,
        datasets: [
          {
            label: "Carbon Score",
            data: scores,
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointHoverBackgroundColor: "#059669",
            pointHoverBorderColor: "#ffffff",
            pointHoverBorderWidth: 3,
          },
        ],
      })
    }

    loadHistory()
    window.addEventListener("carbonHistoryUpdated", loadHistory)

    return () => {
      window.removeEventListener("carbonHistoryUpdated", loadHistory)
    }
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#10b981",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context) => `Date: ${context[0].label}`,
          label: (context) => `Carbon Score: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(107, 114, 128, 0.1)",
          borderDash: [5, 5],
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  }

  return (
    <div className="w-full">
      {chartData.labels.length > 0 ? (
        <div className="relative h-64 w-full">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No carbon data yet</p>
          <p className="text-gray-400 text-sm mt-1">Start logging activities to see your trend</p>
        </div>
      )}
    </div>
  )
}

export default CarbonTrendChart
