import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { Droplet, TrendingDown, TrendingUp, AlertCircle, BarChart2, LogOut } from "lucide-react";
import API_BASE from "../config/api";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [tips, setTips] = useState([]);
  const [tipsMessage, setTipsMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const headers = { Authorization: `Bearer ${user.token}` };

    Promise.all([
      axios.get(`${API_BASE}/history`, { headers }),
      axios.get(`${API_BASE}/personalized-recommendations`, { headers })
    ])
      .then(([histRes, tipsRes]) => {
        const sorted = [...(histRes.data.history || [])].reverse();
        setHistory(sorted);
        setTips(tipsRes.data.tips || []);
        setTipsMessage(tipsRes.data.message || "");
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const chartData = history.map((r, i) => ({
    name: `#${i + 1}`,
    usage: parseFloat(r.prediction.toFixed(1)),
    date: new Date(r.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  }));

  const latest = history[history.length - 1];
  const prev = history[history.length - 2];
  const trend = latest && prev
    ? latest.prediction < prev.prediction ? "improved" : "increased"
    : null;

  const best = history.length
    ? Math.min(...history.map((r) => r.prediction)).toFixed(1)
    : null;
  const worst = history.length
    ? Math.max(...history.map((r) => r.prediction)).toFixed(1)
    : null;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, <span className="text-teal-600 font-medium">{user.name}</span></p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              to="/form"
              className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
            >
              + New Calculation
            </Link>
            <button
              id="dashboard-logout"
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading your data...</div>
        ) : history.length === 0 ? (
          <div className="text-center py-20">
            <BarChart2 className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-2">No data yet</p>
            <p className="text-gray-400 text-sm mb-6">Submit the calculator to start tracking your water footprint</p>
            <Link to="/form" className="px-6 py-3 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition">
              Go to Calculator
            </Link>
          </div>
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <p className="text-xs text-gray-400 mb-1">Total Entries</p>
                <p className="text-2xl font-bold text-gray-800">{history.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <p className="text-xs text-gray-400 mb-1">Latest Usage</p>
                <p className="text-2xl font-bold text-teal-600">{latest?.prediction.toFixed(1)} <span className="text-sm font-normal text-gray-400">L/day</span></p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <p className="text-xs text-gray-400 mb-1">Best (Lowest)</p>
                <p className="text-2xl font-bold text-emerald-600">{best} <span className="text-sm font-normal text-gray-400">L/day</span></p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <p className="text-xs text-gray-400 mb-1">Highest</p>
                <p className="text-2xl font-bold text-red-500">{worst} <span className="text-sm font-normal text-gray-400">L/day</span></p>
              </div>
            </div>

            {/* Trend Banner */}
            {trend && (
              <div className={`mb-6 flex items-center gap-3 px-5 py-4 rounded-xl border ${
                trend === "improved"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-orange-50 border-orange-200 text-orange-700"
              }`}>
                {trend === "improved"
                  ? <TrendingDown className="w-5 h-5" />
                  : <TrendingUp className="w-5 h-5" />
                }
                <p className="text-sm font-medium">
                  {trend === "improved"
                    ? "Great job! Your latest water usage is lower than your previous entry. Keep it up!"
                    : "Your water usage increased since last time. Check personalised tips below to improve."
                  }
                </p>
              </div>
            )}

            {/* Usage Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
              <h2 className="text-base font-semibold text-gray-700 mb-4">Water Usage Over Time (L/day)</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v) => [`${v} L/day`, "Water Usage"]}
                    contentStyle={{ borderRadius: 8, fontSize: 12 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="usage"
                    stroke="#0d9488"
                    strokeWidth={2.5}
                    dot={{ fill: "#0d9488", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Personalized Tips */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-5 h-5 text-teal-600" />
                <h2 className="text-base font-semibold text-gray-700">Personalised Recommendations</h2>
              </div>
              <p className="text-xs text-gray-400 mb-5">{tipsMessage}</p>

              {tips.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  Submit the calculator at least 2 times to unlock personalised recommendations based on your own habits.
                </div>
              ) : (
                <div className="grid gap-4">
                  {tips.map((tip, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-semibold text-teal-700">{tip.field}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium">
                            +{tip.increase_pct}% above your average
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">
                          Current: <strong>{tip.current}</strong> · Your average: <strong>{tip.your_average}</strong>
                        </p>
                        <p className="text-sm text-gray-700">{tip.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </>
        )}
      </div>
    </div>
  );
}
