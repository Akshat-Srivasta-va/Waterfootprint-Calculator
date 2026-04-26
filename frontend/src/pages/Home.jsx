import React from "react";
import { Link } from "react-router-dom";

const IconSave = () => (
  <svg className="w-16 h-16 md:w-20 md:h-20 text-teal-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2s6 6.5 6 10a6 6 0 11-12 0C6 8.5 12 2 12 2z" fill="currentColor" />
    <path d="M9 12h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCalc = () => (
  <svg className="w-16 h-16 md:w-20 md:h-20 text-teal-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4" y="3" width="16" height="18" rx="2" fill="currentColor" />
    <path d="M8 7h8M8 11h8M8 15h8" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconNews = () => (
  <svg className="w-16 h-16 md:w-20 md:h-20 text-teal-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" />
    <path d="M7 9h10M7 13h6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-sky-50 text-gray-800">
      <section className="max-w-6xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-teal-700">
              WHAT'S YOUR WATER FOOTPRINT?
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl">
              Your water footprint includes household and lifestyle water use — flushing, faucets, car washes,
              gardening and more. Learn how much water you use and get practical tips to reduce it.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link to="/form" className="inline-block">
                <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium shadow">
                  Find your Footprint
                </button>
              </Link>

              <Link to="/water-saving-tips" className="inline-flex items-center text-teal-700 hover:underline text-sm">
                Learn water saving tips →
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-gray-100 rounded-lg px-4 py-2">
                <svg className="w-6 h-6 text-teal-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2s6 6.5 6 10a6 6 0 11-12 0C6 8.5 12 2 12 2z" fill="currentColor" />
                </svg>
                <span className="text-sm text-gray-700">Quick estimate · privacy friendly</span>
              </div>
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-gray-100 rounded-lg px-4 py-2">
                <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-sm text-gray-700">Practical tips</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl bg-white shadow-md p-6 transform hover:scale-[1.01] transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Explore</h3>

              <div className="grid gap-4 sm:grid-cols-3">
                <Link to="/water-saving-tips" className="flex flex-col items-center text-center p-3 hover:bg-sky-50 rounded-lg">
                  <IconSave />
                  <p className="mt-3 text-sm font-medium text-gray-700">How to save water</p>
                </Link>

                <Link to="/waterfootprint" className="flex flex-col items-center text-center p-3 hover:bg-sky-50 rounded-lg">
                  <IconCalc />
                  <p className="mt-3 text-sm font-medium text-gray-700">Waterfootprint</p>
                </Link>

                <Link to="/news" className="flex flex-col items-center text-center p-3 hover:bg-sky-50 rounded-lg">
                  <IconNews />
                  <p className="mt-3 text-sm font-medium text-gray-700">News & Articles</p>
                </Link>
              </div>
            </div>

            <div className="hidden md:block absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-gradient-to-tr from-teal-100 to-sky-100 opacity-80 filter blur-2xl pointer-events-none" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
