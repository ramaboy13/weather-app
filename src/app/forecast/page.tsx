"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Weather } from "@/core/domain";
import { Loading } from "@/components/Loading";

export default function ForecastPage() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);

  // Default Jakarta for now, ideally passed from context or query param
  const lat = -6.2088;
  const lon = 106.8456;

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        setWeather(data);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="bg-gray-100 dark:bg-[#0B0C15] min-h-screen flex justify-center font-sans transition-colors duration-300 md:p-8">
      <div className="w-full max-w-7xl bg-white dark:bg-[#0B0C15] md:rounded-[3rem] shadow-2xl overflow-hidden h-screen md:h-[calc(100vh-4rem)] relative flex flex-col border border-gray-100 dark:border-gray-800">
         <header className="p-6 flex items-center gap-4 sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
            <h1 className="font-semibold text-lg dark:text-white">7 Day Forecast</h1>
         </header>
         <main className="flex-1 p-6 overflow-y-auto pb-24">
            {weather && (
                <div className="space-y-4">
                    {weather.daily.map((day, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1E1F29] rounded-2xl">
                             <div className="flex flex-col">
                                <span className="font-semibold dark:text-white">
                                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
                                </span>
                                <span className="text-xs text-gray-500">{day.condition}</span>
                             </div>
                             <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="font-bold dark:text-white">{Math.round(day.maxTemp)}°</span>
                                    <span className="text-xs text-gray-400">{Math.round(day.minTemp)}°</span>
                                </div>
                                <span className="material-icons text-blue-400">
                                    {day.rainChance > 50 ? 'water_drop' : 'wb_sunny'}
                                </span>
                             </div>
                        </div>
                    ))}
                </div>
            )}
         </main>
         <Navigation />
      </div>
    </div>
  );
}
