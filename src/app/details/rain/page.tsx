"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Weather } from "@/core/domain";
import { Loading } from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, Droplets, CloudRain, Cloud, Sun, CloudLightning } from "lucide-react";

import { useLocation } from "@/components/location-provider";

export default function RainDetailPage() {
  const { location, loading: locationLoading } = useLocation();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useLanguage();

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

  const now = weather ? new Date(weather.current.time) : new Date();
  const hourly = weather?.hourly?.filter(h => {
    const hDate = new Date(h.time);
    return hDate.getTime() >= now.getTime() - (now.getMinutes() * 60000);
  }).slice(0, 12) ?? [];
  const maxChance = Math.max(...hourly.map(h => h.rainChance), 1);

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
            <h1 className="font-semibold text-base sm:text-lg dark:text-white">{t('rain_forecast')}</h1>
         </header>
         <main className="flex-1 p-4 sm:p-6 overflow-y-auto pb-32 hide-scroll">
            {weather && (
              <div className="space-y-4 sm:space-y-6">
                {/* Summary Card */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 text-white"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <Droplets className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold">{t('chance_of_rain')}</h2>
                      <p className="text-xs sm:text-sm opacity-80">{t('today')}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
                      <div className="text-2xl sm:text-3xl font-bold">{Math.round(hourly.reduce((s, h) => s + h.rainChance, 0) / (hourly.length || 1))}%</div>
                      <div className="text-[10px] sm:text-xs opacity-80">{t('average')}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
                      <div className="text-2xl sm:text-3xl font-bold">{Math.max(...hourly.map(h => h.rainChance))}%</div>
                      <div className="text-[10px] sm:text-xs opacity-80">{t('maximum')}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
                      <div className="text-2xl sm:text-3xl font-bold">{Math.min(...hourly.map(h => h.rainChance))}%</div>
                      <div className="text-[10px] sm:text-xs opacity-80">{t('minimum')}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Hourly Chart */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-[#1E1F29] rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 border border-gray-100 dark:border-transparent"
                >
                  <h3 className="font-semibold text-sm sm:text-base dark:text-white mb-4 sm:mb-6">{t('hourly_forecast')}</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {hourly.map((hour, i) => {
                      const h = new Date(hour.time).getHours();
                      const ampm = h >= 12 ? 'PM' : 'AM';
                      const displayHour = h % 12 || 12;
                      return (
                        <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.05 * i }}
                          className="flex items-center gap-3 sm:gap-4"
                        >
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 w-14 sm:w-16 text-right">{displayHour}:00 {ampm}</span>
                          <div className="flex-1 h-6 sm:h-8 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(hour.rainChance / maxChance) * 100}%` }}
                              transition={{ duration: 0.5, delay: 0.1 * i }}
                              className={cn(
                                "h-full rounded-full flex items-center justify-end pr-2 sm:pr-3",
                                hour.rainChance > 70 ? "bg-blue-600 dark:bg-blue-500" :
                                hour.rainChance > 40 ? "bg-blue-400 dark:bg-blue-400" :
                                "bg-blue-200 dark:bg-blue-800"
                              )}
                            >
                              {hour.rainChance > 15 && (
                                <span className="text-[10px] sm:text-xs font-bold text-white">{hour.rainChance}%</span>
                              )}
                            </motion.div>
                            {hour.rainChance <= 15 && (
                              <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{hour.rainChance}%</span>
                            )}
                          </div>
                          <div className="flex flex-col items-center gap-2">
                          {hour.condition.toLowerCase().includes("rain") ? <CloudRain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" /> :
                           hour.condition.toLowerCase().includes("cloud") ? <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> :
                           hour.condition.toLowerCase().includes("thunder") ? <CloudLightning className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" /> :
                           <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />}
                           <span className="text-sm sm:text-base font-semibold dark:text-white">{hour.rainChance}%</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Rain Tips */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-[#1E1F29] rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 border border-gray-100 dark:border-transparent"
                >
                  <h3 className="font-semibold text-sm sm:text-base dark:text-white mb-3">{t('tips')}</h3>
                  <div className="space-y-2">
                    {hourly.some(h => h.rainChance > 50) ? (
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{t('rain_tip_high')}</p>
                    ) : hourly.some(h => h.rainChance > 20) ? (
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{t('rain_tip_slight')}</p>
                    ) : (
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{t('rain_tip_none')}</p>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
         </main>
         <Navigation />
      </motion.div>
    </div>
  );
}
