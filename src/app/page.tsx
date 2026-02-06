"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Search } from "@/components/Search";
import { CurrentWeather } from "@/components/CurrentWeather";
import { ForecastRow } from "@/components/ForecastRow";
import { ChanceOfRain } from "@/components/ChanceOfRain";
import { Navigation } from "@/components/Navigation";
import { Location, Weather } from "@/core/domain";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [location, setLocation] = useState<Location>({
    id: "default",
    name: "Seattle",
    region: "WA",
    country: "USA",
    latitude: 47.6062,
    longitude: -122.3321
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      try {
        const res = await fetch(`/api/weather?lat=${location.latitude}&lon=${location.longitude}`);
        if (res.ok) {
          const data = await res.json();
          setWeather(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [location]);

  if (loading && !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0B0C15] text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-[#0B0C15] min-h-screen flex justify-center font-sans transition-colors duration-300 md:p-8">
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="w-full max-w-7xl bg-white dark:bg-[#0B0C15] md:rounded-[3rem] shadow-2xl overflow-hidden min-h-screen relative flex flex-col border border-gray-100 dark:border-gray-800"
       >
          <div onClick={() => router.push('/details/location')} className="cursor-pointer hover:opacity-80 transition-opacity">
            <Header locationName={`${location.name}, ${location.country}`} />
          </div>

          <div className="px-6 mb-6 max-w-2xl mx-auto w-full">
             <Search onLocationSelect={setLocation} />
          </div>

          <main className="flex-1 overflow-y-auto px-6 pb-24 hide-scroll">
             <div className="flex items-center gap-6 mb-6 text-sm font-medium">
               <button className="text-gray-900 dark:text-white border-b-2 border-[#B2DAFF] pb-1">Today</button>
               <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Tomorrow</button>
               <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Next 7 days</button>
             </div>

             {weather && (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-8">
                    <CurrentWeather weather={weather} />
                    <ForecastRow hourly={weather.hourly} />
                 </div>

                 <div className="lg:col-span-1 space-y-8">
                    <Link href="/details/rain" className="block hover:scale-[1.02] transition-transform">
                        <ChanceOfRain hourly={weather.hourly} />
                    </Link>

                    {/* Other large cities placeholder */}
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg dark:text-white">Other large cities</h3>
                            <button className="text-xs text-[#B2DAFF] font-medium">Show All &gt;</button>
                        </div>
                        <div className="bg-white dark:bg-[#1E1F29] p-4 rounded-3xl flex items-center justify-between border border-gray-100 dark:border-transparent cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2B2D3A] transition-colors"
                            onClick={() => setLocation({
                                id: "california", name: "California", region: "CA", country: "US", latitude: 36.7783, longitude: -119.4179
                            })}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-orange-100 dark:bg-orange-500/20 p-2 rounded-2xl">
                                    <span className="text-xl">🇺🇸</span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5">US</p>
                                    <h4 className="font-semibold dark:text-white">California</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Mostly Sunny</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-2xl font-bold dark:text-white">29°</span>
                            </div>
                        </div>
                    </div>
                 </div>
               </div>
             )}
          </main>

          <Navigation />
       </motion.div>
    </div>
  );
}
