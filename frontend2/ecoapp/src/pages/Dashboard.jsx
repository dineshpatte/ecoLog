import React, { useEffect, useState } from "react";
import Rewards from "../components/reward";
import Tips from "../components/tip";
import CarbonTrendChart from "../components/carbonChart";

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [errorNews, setErrorNews] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const storedRaw = localStorage.getItem("dailyRewards");
    try {
      const stored = storedRaw ? JSON.parse(storedRaw) : {};
      const sum = Object.values(stored).reduce((acc, reward) => {
        const points = typeof reward?.points === "number" ? reward.points : 0;
        return acc + points;
      }, 0);
      setTotalPoints(sum);
    } catch (e) {
      console.error("Error parsing rewards from localStorage:", e);
      setTotalPoints(0);
    }
  }, []);

  useEffect(() => {
    const fetchEcoNews = async () => {
      setLoadingNews(true);
      setErrorNews(null);
      try {
        const res = await fetch(
          "https://api.codetabs.com/v1/proxy?quest=" +
            encodeURIComponent("https://www.ecowatch.com/feed")
        );
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        const items = [...xml.querySelectorAll("item")].slice(0, 6);

        const parsedNews = items.map((item) => {
          let imageUrl =
            item.querySelector("media\\:content")?.getAttribute("url") ||
            item.querySelector("enclosure")?.getAttribute("url") ||
            "";

          return {
            title: item.querySelector("title")?.textContent || "No title",
            link: item.querySelector("link")?.textContent || "#",
            pubDate: item.querySelector("pubDate")?.textContent || "",
            description: item.querySelector("description")?.textContent || "",
            imageUrl,
          };
        });

        setNews(parsedNews);
      } catch (err) {
        setErrorNews(err.message);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchEcoNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">EcoLog Dashboard</h1>
      </header>

      {/* Total Points Banner */}
      <div className="mb-10 rounded-lg bg-gradient-to-r from-green-400 to-teal-500 text-white text-center py-5 text-xl font-semibold shadow-lg">
        Total Eco Points: <span className="ml-2 text-2xl">{totalPoints}</span>
      </div>

      {/* Grid layout for main sections */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rewards */}
        <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b border-gray-200 pb-2">
            Today's Reward
          </h2>
          <Rewards onTotalUpdate={setTotalPoints} />
        </section>

        {/* Tips */}
        <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b border-gray-200 pb-2">
            Daily Eco Tips
          </h2>
          <Tips />
        </section>

        {/* Carbon Trend Chart */}
        <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b border-gray-200 pb-2">
            Your Carbon Footprint
          </h2>
          <CarbonTrendChart />
        </section>
      </main>

      {/* News Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-3 text-gray-900">
          Latest Eco News
        </h2>

        {loadingNews && <p className="text-gray-500">Loading news...</p>}
        {errorNews && <p className="text-red-600">Error: {errorNews}</p>}
        {!loadingNews && !errorNews && news.length === 0 && <p>No news available</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map(({ title, link, pubDate, description, imageUrl }, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <time className="text-xs text-gray-400 mb-3">
                  {new Date(pubDate).toLocaleDateString()}
                </time>
                <p className="text-gray-700 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: description }}></p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
