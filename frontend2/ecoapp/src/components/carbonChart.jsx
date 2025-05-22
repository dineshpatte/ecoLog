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
    const history = JSON.parse(localStorage.getItem("carbonHistory")) || [];
    console.log("Raw carbonHistory from localStorage:", history);

    const sorted = history.sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = sorted.map((entry) => entry.date);
    const scores = sorted.map((entry) => Number(entry.carbonScore));

    console.log("Sorted Dates:", labels);
    console.log("Carbon Scores:", scores);

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
