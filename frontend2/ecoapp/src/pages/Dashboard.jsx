"use client"
import { useEffect, useState } from "react"
import Rewards from "../components/reward"
import Tips from "../components/tip"
import CarbonTrendChart from "../components/carbonChart"
import { Award, TrendingDown, Lightbulb, Newspaper, Calendar, ExternalLink } from "lucide-react"

const Dashboard = () => {
  const [news, setNews] = useState([])
  const [loadingNews, setLoadingNews] = useState(false)
  const [errorNews, setErrorNews] = useState(null)
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    const storedRaw = localStorage.getItem("dailyRewards")
    try {
      const stored = storedRaw ? JSON.parse(storedRaw) : {}
      const sum = Object.values(stored).reduce((acc, reward) => {
        const points = typeof reward?.points === "number" ? reward.points : 0
        return acc + points
      }, 0)
      setTotalPoints(sum)
    } catch (e) {
      console.error("Error parsing rewards from localStorage:", e)
      setTotalPoints(0)
    }
  }, [])

  useEffect(() => {
    const fetchEcoNews = async () => {
      setLoadingNews(true)
      setErrorNews(null)
      try {
        const res = await fetch(
          "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent("https://www.ecowatch.com/feed"),
        )
        if (!res.ok) throw new Error("Failed to fetch news")
        const data = await res.text()

        const parser = new DOMParser()
        const xml = parser.parseFromString(data, "text/xml")
        const items = [...xml.querySelectorAll("item")].slice(0, 10)

        const parsedNews = items.map((item) => {
          const imageUrl =
            item.querySelector("media\\:content")?.getAttribute("url") ||
            item.querySelector("enclosure")?.getAttribute("url") ||
            ""

          return {
            title: item.querySelector("title")?.textContent || "No title",
            link: item.querySelector("link")?.textContent || "#",
            pubDate: item.querySelector("pubDate")?.textContent || "",
            description: item.querySelector("description")?.textContent || "",
            imageUrl,
          }
        })

        setNews(parsedNews)
      } catch (err) {
        setErrorNews(err.message)
      } finally {
        setLoadingNews(false)
      }
    }

    fetchEcoNews()
  }, [])

  const maxPoints = 1000
  const progressPercentage = Math.min((totalPoints / maxPoints) * 100, 100)
  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-green-800">Dashboard</h1>

          <div className="relative">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="rgb(220 252 231)" strokeWidth="8" fill="transparent" />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgb(34 197 94)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-green-700">{totalPoints}</div>
                <div className="text-xs text-green-600">points</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingDown className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Carbon Impact</h2>
            </div>
            <CarbonTrendChart />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Daily Rewards</h2>
            </div>
            <Rewards onTotalUpdate={setTotalPoints} />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Eco Tips</h2>
            </div>
            <Tips />
          </div>

          <div className="md:col-span-2 lg:col-span-3 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <Newspaper className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Eco News</h2>
            </div>

            {loadingNews && <p className="text-gray-500">Loading...</p>}
            {errorNews && <p className="text-red-600">Error: {errorNews}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-80 overflow-y-auto">
              {news.map(({ title, link, pubDate }, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">{title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(pubDate).toLocaleDateString()}</span>
                    </div>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
