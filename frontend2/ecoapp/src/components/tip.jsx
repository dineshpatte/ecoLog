import React, { useEffect, useState } from "react";
import api from "../api";

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.post(
          "/tips/generate",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTips(response.data.data.tips || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch tips");
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading tips...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (tips.length === 0) return <p className="text-center text-gray-400">No tips available</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-green-50 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center"> Daily Eco Tips</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {tips.map((tip, idx) => (
          <li key={idx} className="hover:text-green-900 transition-colors">{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tips;
