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

    try {
      const response = await api.post('/activities/logactivity', form, {
        withCredentials: true,
      });

      const { carbonScore } = response.data.data;

      // Save score to localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
      const key = `carbonHistory_${userId}`;
      const history = JSON.parse(localStorage.getItem(key)) || [];
      history.push({ date: form.date, carbonScore });
      localStorage.setItem(key, JSON.stringify(history));

      setMessage(`Activity logged! Your carbon score is ${carbonScore}`);
      setTimeout(() => window.location.reload(), 1500); // Optionally reload
    } catch (error) {
      setMessage('Failed to log activity: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Log Your Eco Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date input */}
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Transport */}
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

        {/* Food */}
        <div>
          <h3 className="font-semibold">Food Servings:</h3>
          {[
            ['meatServings', 'Meat'],
            ['dairyServings', 'Dairy'],
            ['vegetarianServings', 'Vegetarian'],
            ['veganServings', 'Vegan'],
            ['localProducePercent', '% Local Produce'],
          ].map(([key, label]) => (
            <div key={key}>
              <label htmlFor={key}>{label}:</label>
              <input
                id={key}
                type="number"
                name={`food.${key}`}
                value={form.food[key]}
                onChange={handleChange}
                min="0"
                max={key === 'localProducePercent' ? '100' : undefined}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </div>

        {/* Energy */}
        <div>
          <h3 className="font-semibold">Energy Usage:</h3>
          <label htmlFor="energySource">Energy Source:</label>
          <select
            id="energySource"
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

          <label htmlFor="electricityKwh">Electricity (kWh):</label>
          <input
            id="electricityKwh"
            type="number"
            name="energy.electricityKwh"
            value={form.energy.electricityKwh}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border rounded"
          />

          <label htmlFor="gasKwh">Gas (kWh):</label>
          <input
            id="gasKwh"
            type="number"
            name="energy.gasKwh"
            value={form.energy.gasKwh}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Waste */}
        <div>
          <label htmlFor="wasteType">Waste Type:</label>
          <select
            id="wasteType"
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

        {/* Eco Actions */}
        <div>
          <label htmlFor="ecoActions">Other Eco Actions (comma separated):</label>
          <input
            id="ecoActions"
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

        {message && <p className="mt-3 text-center text-green-600 font-semibold">{message}</p>}
      </form>
    </div>
  );
};

export default LogActivity;
