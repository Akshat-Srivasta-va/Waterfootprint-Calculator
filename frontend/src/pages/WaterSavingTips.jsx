
import React, { useState } from "react";

const categoriesData = {
  bathroom: {
    title: "Bathroom",
    tips: [
      {
        title: "Shower",
        impact: "Save up to 75 L / shower",
        suggestions: [
          "Take shorter showers (aim for 5 minutes)",
          "Install a low‑flow showerhead",
          "Turn off water while lathering",
          "Use a shower timer"
        ]
      },
      {
        title: "Toilet",
        impact: "Save up to 19 L / flush",
        suggestions: [
          "Install a dual‑flush toilet",
          "Place a displacement device in the tank",
          "Fix leaky toilets immediately",
          "Don't use the toilet as a wastebasket"
        ]
      },
      {
        title: "Faucet",
        impact: "Save up to 8 L / min",
        suggestions: [
          "Install aerators on faucets",
          "Turn off water while brushing teeth",
          "Fix dripping faucets",
          "Use a basin for washing produce"
        ]
      }
    ]
  },
  kitchen: {
    title: "Kitchen",
    tips: [
      {
        title: "Dishwashing",
        impact: "Save up to 38 L / load",
        suggestions: [
          "Run dishwasher only when full",
          "Scrape dishes instead of rinsing",
          "Use eco dishwasher settings",
          "Hand wash in a basin"
        ]
      },
      {
        title: "Cooking",
        impact: "Save up to 11 L / day",
        suggestions: [
          "Steam vegetables instead of boiling",
          "Reuse cooking water for plants",
          "Thaw food in fridge",
          "Use minimal water to wash produce"
        ]
      },
      {
        title: "Drinking Water",
        impact: "Save up to 4 L / day",
        suggestions: [
          "Keep a pitcher of cold water in fridge",
          "Use a water filter instead of bottled water",
          "Collect waiting water for plants",
          "Use reusable bottles"
        ]
      }
    ]
  },
  laundry: {
    title: "Laundry",
    tips: [
      {
        title: "Washing Machine",
        impact: "Save up to 57 L / load",
        suggestions: [
          "Run full loads only",
          "Use cold water when possible",
          "Choose shorter wash cycles",
          "Maintain machine regularly"
        ]
      },
      {
        title: "Clothing Care",
        impact: "Save up to 19 L / week",
        suggestions: [
          "Wear clothes multiple times before washing",
          "Spot clean when possible",
          "Use eco detergents",
          "Air dry clothes"
        ]
      }
    ]
  },
  outdoor: {
    title: "Outdoor",
    tips: [
      {
        title: "Gardening",
        impact: "Save up to 114 L / week",
        suggestions: [
          "Water early morning or evening",
          "Use mulch to retain moisture",
          "Choose drought‑resistant plants",
          "Install drip irrigation"
        ]
      },
      {
        title: "Car Washing",
        impact: "Save up to 151 L / wash",
        suggestions: [
          "Use a bucket instead of hose",
          "Wash car on lawn to water grass",
          "Use waterless car wash products",
          "Visit commercial car washes that recycle water"
        ]
      },
      {
        title: "Cleaning",
        impact: "Save up to 38 L / cleaning",
        suggestions: [
          "Use a broom instead of hose for patios",
          "Clean driveways with a brush",
          "Use a bucket for window washing",
          "Sweep debris instead of hosing"
        ]
      }
    ]
  }
};

const CheckIcon = ({ className = "w-5 h-5 text-emerald-500" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
  </svg>
);

const LeafIcon = ({ className = "w-4 h-4 text-emerald-700" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M10 2C6 2 2 6 2 10s4 8 8 8c4 0 8-4 8-8V6c0-2.2-1.8-4-4-4h-4z" />
  </svg>
);

export default function WaterSavingTips() {
  const [activeCategory, setActiveCategory] = useState("bathroom");
  const categories = categoriesData;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12">
      <div className="container mx-auto px-4">
        <header className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-700 mb-3">How to Save Water</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Practical tips to reduce your water footprint — at home and outdoors. Select a category to see targeted suggestions.
          </p>
        </header>

        <section className="max-w-6xl mx-auto">
          {/* category nav */}
          <nav className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(categories).map(([key, cat]) => {
              const active = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  aria-pressed={active}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-shadow text-sm sm:text-base
                    ${active ? "bg-teal-600 text-white shadow-md" : "bg-white text-teal-700 border-teal-200 hover:shadow-sm"}
                  `}
                >
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${active ? "bg-white/20" : "bg-teal-50"}`}>
                    <LeafIcon className={active ? "w-4 h-4 text-white" : "w-4 h-4 text-teal-600"} />
                  </span>
                  <span className="font-medium">{cat.title}</span>
                </button>
              );
            })}
          </nav>

          {/* tips grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories[activeCategory].tips.map((tip, idx) => (
              <article key={idx} className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition transform hover:-translate-y-1">
                <header className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-teal-700">{tip.title}</h3>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">
                    <LeafIcon className="w-4 h-4 text-emerald-700" />
                    <span>{tip.impact}</span>
                  </div>
                </header>

                <ul className="space-y-3">
                  {tip.suggestions.map((sugg, sidx) => (
                    <li key={sidx} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-1"><CheckIcon /></span>
                      <p className="text-sm">{sugg}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* footer summary */}
          <div className="mt-10 bg-white rounded-xl p-6 shadow">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-teal-700 mb-2">Your Impact</h2>
              <p className="text-gray-600 mb-6">By applying these tips you can save hundreds of liters of water each month, reduce energy use and lower bills.</p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center p-4 bg-sky-50 rounded-lg">
                  <svg className="w-8 h-8 text-teal-600 mb-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2s6 6.5 6 10a6 6 0 11-12 0C6 8.5 12 2 12 2z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-800">Save up to 50% water</p>
                </div>

                <div className="flex flex-col items-center p-4 bg-sky-50 rounded-lg">
                  <svg className="w-8 h-8 text-amber-500 mb-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-800">Reduce carbon footprint</p>
                </div>

                <div className="flex flex-col items-center p-4 bg-sky-50 rounded-lg">
                  <svg className="w-8 h-8 text-violet-600 mb-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 3h18v4H3zM5 9h14v10H5z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-800">Lower utility bills</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
