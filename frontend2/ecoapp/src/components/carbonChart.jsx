import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip
);

const CarbonTrendChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
useEffect(() => {
  const loadHistory = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    const historyKey = userId ? `carbonHistory_${userId}` : "carbonHistory";
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];

    const sorted = history.sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = sorted.map((entry) =>
      new Date(entry.date).toLocaleDateString()
    );
    const scores = sorted.map((entry) => Number(entry.carbonScore ?? 0));

    setChartData({
      labels,
      datasets: [
        {
          label: "Carbon Score",
          data: scores,
          borderColor: "#22c55e",
          backgroundColor: "#bbf7d0",
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    });
  };

  loadHistory(); // initial load
  window.addEventListener("carbonHistoryUpdated", loadHistory); // listen for updates

  return () => {
    window.removeEventListener("carbonHistoryUpdated", loadHistory);
  };
}, []);



  return (
    <div className="max-w-3xl mx-auto p-4 mt-6 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-2 text-center">Carbon Score Over Time</h2>
      {chartData.labels.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p className="text-center text-gray-500">No data to display.</p>
      )}
    </div>
  );
};

export default CarbonTrendChart;
