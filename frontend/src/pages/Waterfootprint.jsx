// import React from 'react'

// const Waterfootprint = () => {
//   return (
//     <div>Waterfootprint</div>
//   )
// }

// export default Waterfootprint


// ...existing code...
import React from "react";
import { Link } from "react-router-dom";
import { Droplet, Calculator, BarChart2, Lightbulb, Globe } from "lucide-react";

const Feature = ({ Icon, title, children }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition">
    <div className="w-12 h-12 flex items-center justify-center rounded-md bg-teal-50 text-teal-600 mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{children}</p>
  </div>
);

const Stat = ({ number, label }) => (
  <div className="flex flex-col items-center">
    <div className="text-3xl font-extrabold text-teal-600">{number}</div>
    <div className="text-sm text-gray-600 mt-1 text-center">{label}</div>
  </div>
);

export default function Waterfootprint() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12">
      <section className="max-w-6xl mx-auto px-4">
        <header className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center">
                <Droplet className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-teal-700">Water Footprint</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
              Understand your water footprint — take action today
            </h1>

            <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl">
              Learn how everyday choices affect freshwater use and find practical steps to reduce consumption
              at home and in your community.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link to="/form" className="inline-block">
                <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium shadow">
                  Start calculation
                </button>
              </Link>
              <Link to="/water-saving-tips" className="text-teal-700 hover:underline text-sm">
                Water saving tips →
              </Link>
            </div>
          </div>

          <div className="order-first lg:order-last">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick overview</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-sky-50 text-sky-600">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Calculator</div>
                    <div className="text-xs text-gray-500">Estimate personal use</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Track</div>
                    <div className="text-xs text-gray-500">Monitor progress</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Tips</div>
                    <div className="text-xs text-gray-500">Practical actions</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-violet-50 text-violet-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Impact</div>
                    <div className="text-xs text-gray-500">Global context</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <Feature Icon={Calculator} title="Calculate Your Impact">
            Use our interactive calculator to estimate your daily water use and identify high-consumption activities.
          </Feature>

          <Feature Icon={BarChart2} title="Track Progress">
            Monitor changes over time and see how simple habit changes reduce overall consumption.
          </Feature>

          <Feature Icon={Lightbulb} title="Get Recommendations">
            Receive tailored suggestions for reducing water use based on your lifestyle and home setup.
          </Feature>
        </section>

        <section className="mt-10 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why water footprint matters</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <Stat number="70%" label="of global water use is for agriculture" />
            <Stat number="20%" label="used by industry" />
            <Stat number="10%" label="used for domestic purposes" />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-sky-50">
              <h3 className="font-semibold text-gray-800">How it works</h3>
              <p className="text-sm text-gray-600 mt-2">Provide details of daily activities, we compute estimated liters/day and tailored tips.</p>
            </div>

            <div className="p-4 rounded-lg bg-emerald-50">
              <h3 className="font-semibold text-gray-800">Personalize</h3>
              <p className="text-sm text-gray-600 mt-2">Adjust inputs for household size, appliances and routines for accurate results.</p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50">
              <h3 className="font-semibold text-gray-800">Act</h3>
              <p className="text-sm text-gray-600 mt-2">Small changes add up — save water, energy and money.</p>
            </div>
          </div>
        </section>

        <section className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-teal-100 to-sky-50 p-6 rounded-xl">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Ready to learn your water footprint?</h3>
            <p className="text-sm text-gray-600 mt-1">Start the quick assessment and get immediate recommendations.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/form" className="inline-block">
              <button className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium">Start Now</button>
            </Link>
            <Link to="/news" className="text-teal-700 hover:underline self-center">Read articles</Link>
          </div>
        </section>
      </section>
    </main>
  );
}
// ...existing code...