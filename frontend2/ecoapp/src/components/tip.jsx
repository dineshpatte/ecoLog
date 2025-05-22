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

  if (loading) return <p>Loading tips...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (tips.length === 0) return <p>No tips available</p>;

  return (
    <div>
      <h2>Daily Eco Tips</h2>
      <ul>
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tips;
