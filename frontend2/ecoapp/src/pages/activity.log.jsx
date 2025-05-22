import React, { useState } from 'react';
import api from '../api';

const LogActivity = () => {
  const [form, setForm] = useState({
    date: '',
    transport: [{ mode: '', distanceKm: '' }],
    food: {
      meatServings: 0,
      dairyServings: 0,
      vegetarianServings: 0,
      veganServings: 0,
      localProducePercent: 0,
    },
    energy: {
      energySource: '',
      electricityKwh: 0,
      gasKwh: 0,
    },
    waste: {
      wasteType: '',
    },
    otherEcoActions: [],
  });

  const [message, setMessage] = useState('');
  const [carbonScore, setCarbonScore] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('food.')) {
      const key = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        food: { ...prev.food, [key]: Number(value) }
      }));
    } else if (name.startsWith('energy.')) {
      const key = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        energy: { ...prev.energy, [key]: key === 'energySource' ? value : Number(value) }
      }));
    } else if (name.startsWith('waste.')) {
      const key = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        waste: { ...prev.waste, [key]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTransportChange = (e, index) => {
    const { name, value } = e.target;
    const newTransport = [...form.transport];
    newTransport[index][name] = name === 'distanceKm' ? Number(value) : value;
    setForm(prev => ({ ...prev, transport: newTransport }));
  };

  const addTransport = () => {
    setForm(prev => ({
      ...prev,
      transport: [...prev.transport, { mode: '', distanceKm: '' }]
    }));
  };

  const removeTransport = (index) => {
    const newTransport = form.transport.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, transport: newTransport }));
  };

  const handleEcoActionsChange = (e) => {
    const actions = e.target.value.split(',').map(a => a.trim()).filter(Boolean);
    setForm(prev => ({ ...prev, otherEcoActions: actions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setCarbonScore(null);

    try {
      const response = await api.post('/activities/logactivity', form, {
        withCredentials: true,
      });

      const newScore = response.data.data.carbonScore;
      setCarbonScore(newScore);
      setMessage('Activity logged successfully!');

      const existingHistory = JSON.parse(localStorage.getItem("carbonHistory")) || [];
      const filteredHistory = existingHistory.filter(entry => entry.date !== form.date);

      const newEntry = {
        date: form.date,
        carbonScore: newScore,
      };

      filteredHistory.push(newEntry);
      localStorage.setItem("carbonHistory", JSON.stringify(filteredHistory));

      localStorage.setItem('lastActivity', JSON.stringify(form));

    } catch (error) {
      setMessage('Failed to log activity: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Log Your Eco Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Transport Modes & Distances:</label>
          {form.transport.map((t, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <select
                name="mode"
                value={t.mode}
                onChange={e => handleTransportChange(e, idx)}
                required
                className="flex-1 p-2 border rounded"
              >
                <option value="">Select mode</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="walk">Walk</option>
                <option value="public">Public Transport</option>
                <option value="other">Other</option>
              </select>
              <input
                type="number"
                name="distanceKm"
                placeholder="Distance (km)"
                value={t.distanceKm}
                onChange={e => handleTransportChange(e, idx)}
                min="0"
                required
                className="w-24 p-2 border rounded"
              />
              {idx > 0 && (
                <button type="button" onClick={() => removeTransport(idx)} className="text-red-600 font-bold">
                  X
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addTransport} className="text-green-600 text-sm">
            + Add Transport
          </button>
        </div>

        <div>
          <label>Meat Servings:</label>
          <input
            type="number"
            name="food.meatServings"
            value={form.food.meatServings}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Dairy Servings:</label>
          <input
            type="number"
            name="food.dairyServings"
            value={form.food.dairyServings}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Vegetarian Servings:</label>
          <input
            type="number"
            name="food.vegetarianServings"
            value={form.food.vegetarianServings}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Vegan Servings:</label>
          <input
            type="number"
            name="food.veganServings"
            value={form.food.veganServings}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Local Produce Percent:</label>
          <input
            type="number"
            name="food.localProducePercent"
            value={form.food.localProducePercent}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Energy Source:</label>
          <select
            name="energy.energySource"
            value={form.energy.energySource}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select energy source</option>
            <option value="mostly renewable">Mostly renewable</option>
            <option value="some renewable">Some renewable</option>
            <option value="no renewable">No renewable</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label>Electricity Usage (kWh):</label>
          <input
            type="number"
            name="energy.electricityKwh"
            value={form.energy.electricityKwh}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Gas Usage (kWh):</label>
          <input
            type="number"
            name="energy.gasKwh"
            value={form.energy.gasKwh}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Waste Type:</label>
          <select
            name="waste.wasteType"
            value={form.waste.wasteType}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select waste type</option>
            <option value="mostly recycled">Mostly recycled</option>
            <option value="some recycled">Some recycled</option>
            <option value="no recycling">No recycling</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label>Other Eco Actions (comma separated):</label>
          <input
            type="text"
            onChange={handleEcoActionsChange}
            placeholder="e.g. used reusable bag, planted tree"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-4"
        >
          Log Activity
        </button>

        {message && <p className="mt-3 text-center text-red-600">{message}</p>}
        {carbonScore !== null && (
          <p className="mt-1 text-center text-lg text-green-700 font-bold">
            Your Carbon Score: {carbonScore}
          </p>
        )}
      </form>
    </div>
  );
};

export default LogActivity;
