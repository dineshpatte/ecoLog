import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../api";

const ActivityChart = () => {
  const [data, setData] = useState([]);
  const [newActivity, setNewActivity] = useState({
    date: '',
    transportScore: 0,
    foodScore: 0,
    energyScore: 0,
    wasteScore: 0,
  });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/activities/getactivity", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.data || !Array.isArray(res.data.data)) {
          setData([]);
          return;
        }

        const mappedData = res.data.data.map((item) => ({
          date: new Date(item.date).toLocaleDateString(),
          Transport: item.transportScore ?? 0,
          Food: item.foodScore ?? 0,
          Energy: item.energyScore ?? 0,
          Waste: item.wasteScore ?? 0,
        }));

        setData(mappedData);
      } catch (error) {
        setData([
          { date: '05/19/2025', Transport: 10, Food: 15, Energy: 20, Waste: 5 },
          { date: '05/20/2025', Transport: 8, Food: 18, Energy: 25, Waste: 4 },
          { date: '05/21/2025', Transport: 12, Food: 14, Energy: 22, Waste: 6 },
        ]);
      }
    };

    fetchActivities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity(prev => ({
      ...prev,
      [name]: name === 'date' ? value : Number(value)
    }));
  };

  const handleAddActivity = () => {
    if (!newActivity.date) {
      alert("Please enter a date.");
      return;
    }

    // Format date the same way as fetched data
    const formattedDate = new Date(newActivity.date).toLocaleDateString();

    // Create new activity object matching chart data shape
    const activityToAdd = {
      date: formattedDate,
      Transport: newActivity.transportScore,
      Food: newActivity.foodScore,
      Energy: newActivity.energyScore,
      Waste: newActivity.wasteScore,
    };

    // Append new activity to existing data
    setData(prevData => [...prevData, activityToAdd]);

    // Reset input form
    setNewActivity({
      date: '',
      transportScore: 0,
      foodScore: 0,
      energyScore: 0,
      wasteScore: 0,
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h3>Add New Activity</h3>
        <input
          type="date"
          name="date"
          value={newActivity.date}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="transportScore"
          placeholder="Transport"
          value={newActivity.transportScore}
          onChange={handleInputChange}
          min={0}
        />
        <input
          type="number"
          name="foodScore"
          placeholder="Food"
          value={newActivity.foodScore}
          onChange={handleInputChange}
          min={0}
        />
        <input
          type="number"
          name="energyScore"
          placeholder="Energy"
          value={newActivity.energyScore}
          onChange={handleInputChange}
          min={0}
        />
        <input
          type="number"
          name="wasteScore"
          placeholder="Waste"
          value={newActivity.wasteScore}
          onChange={handleInputChange}
          min={0}
        />
        <button onClick={handleAddActivity}>Add Activity</button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Transport" stackId="a" fill="#ff4d4f" />
          <Bar dataKey="Food" stackId="a" fill="#52c41a" />
          <Bar dataKey="Energy" stackId="a" fill="#faad14" />
          <Bar dataKey="Waste" stackId="a" fill="#1890ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
