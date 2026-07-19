"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Loading } from "@/components/Loading";
import { Weather } from "@/core/domain";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ArrowLeft, Cloud, Sun, CloudRain, CloudLightning, Moon } from "lucide-react";

import { useLocation } from "@/components/location-provider";

export default function ForecastPage() {
  const { location, loading: locationLoading } = useLocation();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!location) return;
    async function fetchWeather() {
      try {
        const res = await fetch(`/api/weather?lat=${location?.latitude}&lon=${location?.longitude}`);
        const data = await res.json();
        setWeather(data);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [location]);

  if (loading || locationLoading) return <Loading />;

  return (
    <div className="min-h-screen flex justify-center font-sans transition-colors duration-300 md:p-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-7xl bg-white dark:bg-[#0B0C15] md:rounded-[3rem] shadow-2xl overflow-hidden h-screen md:h-[calc(100vh-4rem)] relative flex flex-col border border-gray-100 dark:border-gray-800"
      >
         <header className="p-4 sm:p-6 flex items-center gap-3 sm:gap-4 sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-[#1E1F29] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#2B2D3A] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="font-semibold text-base sm:text-lg dark:text-white">{t('seven_day_forecast')}</h1>
         </header>
         <main className="flex-1 p-4 sm:p-6 overflow-y-auto pb-32 hide-scroll">
            {weather && (
                <div className="space-y-3 sm:space-y-4">
                    {weather.daily.map((day, i) => {
                      const date = new Date(day.date);
                      const isToday = i === 0;
                      return (
                        <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.05 * i }}
                          className={cn(
                            "flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-colors cursor-pointer",
                            isToday
                              ? "bg-[#B2DAFF]/20 dark:bg-blue-900/20 border border-[#B2DAFF] dark:border-blue-800"
                              : "bg-gray-50 dark:bg-[#1E1F29] hover:bg-gray-100 dark:hover:bg-[#2B2D3A]"
                          )}
                        >
                             <div className="flex flex-col">
                                <span className={cn("font-semibold text-sm sm:text-base", isToday ? "text-blue-600 dark:text-blue-400" : "dark:text-white")}>
                                    {isToday ? t('today') : date.toLocaleDateString('en-US', { weekday: 'long' })}
                                </span>
                                <span className="text-[10px] sm:text-xs text-gray-500">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                <span className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{day.condition}</span>
                             </div>
                             <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-base sm:text-lg dark:text-white">{Math.round(day.maxTemp)}°</span>
                                    <span className="text-xs text-gray-400">{Math.round(day.minTemp)}°</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                  {day.condition.toLowerCase().includes("rain") ? <CloudRain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" /> :
                                   day.condition.toLowerCase().includes("cloud") ? <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" /> :
                                   day.condition.toLowerCase().includes("thunder") ? <CloudLightning className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" /> :
                                   <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
                                  <span className="text-[10px] sm:text-xs text-gray-400">{day.rainChance}%</span>
                                </div>
                             </div>
                        </motion.div>
                      );
                    })}
                </div>
            )}
         </main>
         <Navigation />
      </motion.div>
    </div>
  );
}
