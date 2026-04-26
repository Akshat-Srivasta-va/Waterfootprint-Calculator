import React, { useState } from "react";
import axios from "axios";
import { Droplet, Check, RefreshCw } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DEFAULTS = {
  faucetDuration: 0,
  faucetPressure: "low",
  dishwasher: false,
  dishwasherTimes: 0,
  toiletFlushes: 0,
  toiletType: "low flow",
  showerTimes: "1", // "1" = daily, "0.14" = weekly, "0.5" = alternate
  showerDuration: 0,
  hasGarden: false,
  gardenType: "none",
  gardenWaterTimes: 0,
  clothesWashTimes: 0,
  washingMachineType: "none",
  moppingTimes: "1",
  moppingMethod: "wet",
  vehicleType: "car",
  vehicleWashTimes: 0,
  hasRO: false,
  roWaterUsage: "none",
  houseSize: "1220",
  householdMembers: 1,
};

export default function Form({ setResult }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(DEFAULTS);
  const [totalWaterFootprint, setTotalWaterFootprint] = useState(undefined);
  const [recommendations, setRecommendations] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const THRESHOLD = 183;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setHasSubmitted(false);
    setTotalWaterFootprint(undefined);
    setRecommendations([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setLoading(true);

    // normalize frequency selections to daily numbers
    const dailyShowerUsage =
      formData.showerTimes === "1" ? 1 : formData.showerTimes === "0.14" ? 1 / 7 : 0.5;
    const dailyMoppingUsage =
      formData.moppingTimes === "1" ? 1 : formData.moppingTimes === "0.14" ? 1 / 7 : 0.5;

    const payload = {
      ...formData,
      showerTimes: dailyShowerUsage,
      moppingTimes: dailyMoppingUsage,
    };

    try {
      const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
      const response = await axios.post("http://127.0.0.1:8000/predict", payload, { headers });
      const baseWaterFootprint = response.data?.water_footprint ?? response.data?.prediction ?? 0;
      const recs = response.data?.recommendations ?? [];

      const members = Number(payload.householdMembers) || 1;
      let total;
      if (members <= 1) {
        total = baseWaterFootprint;
      } else {
        const additionalUsage =
          ((payload.dishwasherTimes || 0) * 6 +
            (payload.gardenWaterTimes || 0) * 6 +
            (payload.clothesWashTimes || 0) * 6 +
            (payload.vehicleWashTimes || 0) * 6 +
            (payload.moppingTimes || 0) * 5) *
          (members - 1);

        total = baseWaterFootprint * members - additionalUsage;
      }

      setTotalWaterFootprint(total);
      setRecommendations(total > THRESHOLD ? recs : []);
      if (typeof setResult === "function") setResult({ total, recs });
    } catch (err) {
      console.error("Error submitting form:", err);
      setHasSubmitted(false);
      setTotalWaterFootprint(undefined);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4 bg-gradient-to-b from-sky-50 to-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-md p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center">
            <Droplet className="w-5 h-5" />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Calculate Your Water Footprint</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Average faucet duration (minutes)</span>
            <input
              name="faucetDuration"
              type="number"
              min="0"
              value={formData.faucetDuration}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Faucet pressure</span>
            <select
              name="faucetPressure"
              value={formData.faucetPressure}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            >
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </label>

          <label className="flex items-center gap-3 mt-2">
            <input
              name="dishwasher"
              type="checkbox"
              checked={formData.dishwasher}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-700">Use dishwasher</span>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Dishwasher uses per day</span>
            <input
              name="dishwasherTimes"
              type="number"
              min="0"
              value={formData.dishwasherTimes}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Toilet flushes per day</span>
            <input
              name="toiletFlushes"
              type="number"
              min="0"
              value={formData.toiletFlushes}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Toilet type</span>
            <select
              name="toiletType"
              value={formData.toiletType}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            >
              <option value="low flow">Low Flow</option>
              <option value="dual flush">Dual Flush</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Shower frequency</span>
            <select
              name="showerTimes"
              value={formData.showerTimes}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            >
              <option value="1">Daily</option>
              <option value="0.14">Weekly</option>
              <option value="0.5">Alternate</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Average shower duration (minutes)</span>
            <input
              name="showerDuration"
              type="number"
              min="0"
              value={formData.showerDuration}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            />
          </label>

          <label className="flex items-center gap-3 mt-2">
            <input name="hasGarden" type="checkbox" checked={formData.hasGarden} onChange={handleChange} className="h-4 w-4" />
            <span className="text-sm text-gray-700">Have a garden</span>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Garden type</span>
            <select
              name="gardenType"
              value={formData.gardenType}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            >
              <option value="none">None</option>
              <option value="flower">Flower</option>
              <option value="vegetable">Vegetable</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Garden water times per week</span>
            <input
              name="gardenWaterTimes"
              type="number"
              min="0"
              value={formData.gardenWaterTimes}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Clothes wash times per week</span>
            <input
              name="clothesWashTimes"
              type="number"
              min="0"
              value={formData.clothesWashTimes}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Washing machine type</span>
            <select
              name="washingMachineType"
              value={formData.washingMachineType}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            >
              <option value="none">None</option>
              <option value="top load">Top Load</option>
              <option value="front load">Front Load</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Mopping frequency</span>
            <select
              name="moppingTimes"
              value={formData.moppingTimes}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            >
              <option value="1">Daily</option>
              <option value="0.14">Weekly</option>
              <option value="0.5">Alternate</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Mopping method</span>
            <select
              name="moppingMethod"
              value={formData.moppingMethod}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            >
              <option value="wet">Wet</option>
              <option value="dry">Dry</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Vehicle type</span>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Vehicle wash times per week</span>
            <input
              name="vehicleWashTimes"
              type="number"
              min="0"
              value={formData.vehicleWashTimes}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            />
          </label>

          <label className="flex items-center gap-3 mt-2">
            <input name="hasRO" type="checkbox" checked={formData.hasRO} onChange={handleChange} className="h-4 w-4" />
            <span className="text-sm text-gray-700">Have an RO</span>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">RO wasted water usage</span>
            <select
              name="roWaterUsage"
              value={formData.roWaterUsage}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            >
              <option value="none">None</option>
              <option value="cleaning">Cleaning</option>
              <option value="plants">Plants</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">House size</span>
            <select
              name="houseSize"
              value={formData.houseSize}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            >
              <option value="1220">1 BHK</option>
              <option value="2220">2 BHK</option>
              <option value="3320">3 BHK</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-700">Household members</span>
            <input
              name="householdMembers"
              type="number"
              min="1"
              value={formData.householdMembers}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-teal-300"
            />
          </label>
        </div>

        {/* Result */}
        {totalWaterFootprint !== undefined && (
          <div
            className={`mt-6 p-4 rounded-md text-center font-medium ${
              totalWaterFootprint > THRESHOLD ? "bg-red-50 text-red-700" : "bg-green-50 text-emerald-800"
            }`}
          >
            Total Water Footprint: {Number(totalWaterFootprint).toFixed(2)} L/day
          </div>
        )}

        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="mt-6 bg-teal-50 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-teal-700">Recommendations</h3>
            </div>
            <ul className="grid gap-2">
              {recommendations.map((rec, i) => (
                <li key={i} className="p-3 bg-white rounded-md text-sm border">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {!hasSubmitted ? (
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-4 py-2 rounded-md text-white font-medium transition ${
                loading ? "bg-gray-300 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                <RefreshCw className="w-4 h-4 inline-block mr-2" /> Recalculate
              </button>

              <button
                type="button"
                onClick={() => setHasSubmitted(false)}
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

