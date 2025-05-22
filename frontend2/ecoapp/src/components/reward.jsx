import React, { useEffect, useState } from "react";
import axios from "axios";

const Rewards = () => {
  const [reward, setReward] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReward = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("Not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.post(
          "http://localhost:3000/api/v1/rewards/check-daily-reward",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data.data) {
          setReward(res.data.data);
          setMessage(res.data.message);
        } else {
          setReward(null);
          setMessage(res.data.message || "No rewards available");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error fetching reward");
      } finally {
        setLoading(false);
      }
    };

    fetchReward();
  }, []);

  if (loading) return <p>Loading rewards...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Rewards</h2>
      {reward ? (
        <div>
          <h3>{reward.title}</h3>
          <p>{reward.description}</p>
          <p>Points: {reward.points}</p>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default Rewards;
