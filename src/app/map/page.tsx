"use client";

import dynamic from "next/dynamic";
import { Navigation } from "@/components/Navigation";
import { useEffect, useState } from "react";
import { Weather } from "@/core/domain";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { useLocation } from "@/components/location-provider";
import { useRouter } from "next/navigation";
import { ArrowLeft, Radar, Droplets, Wind, Gauge, Thermometer, Eye, ChevronDown, ChevronUp, CloudRain } from "lucide-react";

const MapComponent = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="text-gray-500 dark:text-gray-400 text-sm">Loading Map...</div>
    </div>
  ),
});

export default function MapPage() {
  const { location: geoLocation } = useLocation();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [showInfo, setShowInfo] = useState(true);
  const { t } = useLanguage();
  const router = useRouter();

  const lat = geoLocation?.latitude ?? -6.2088;
  const lon = geoLocation?.longitude ?? 106.8456;

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (res.ok) {
          const data = await res.json();
          setWeather(data);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchWeather();
  }, [lat, lon]);

  return (
    <div className="min-h-screen flex justify-center font-sans transition-colors duration-300 md:p-8 relative">
      <div className="w-full max-w-7xl bg-white dark:bg-[#0B0C15] md:rounded-[3rem] shadow-2xl overflow-hidden h-screen md:h-[calc(100vh-4rem)] relative flex flex-col border border-gray-100 dark:border-gray-800">
         <header className="p-4 sm:p-6 flex items-center gap-3 sm:gap-4 sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
            <button onClick={() => router.back()} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-[#1E1F29] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#2B2D3A] transition-colors cursor-pointer">
              <ArrowLeft size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="font-semibold text-base sm:text-lg dark:text-white">{t('weather_map')}</h1>
         </header>
         <main className="flex-1 relative z-0">
             <div className="h-full w-full min-h-[400px] sm:min-h-[500px]">
                <MapComponent lat={lat} lon={lon} />
             </div>

             {/* Weather Info Overlay */}
             {weather && (
               <motion.div
                 initial={{ y: 100, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                 className="absolute bottom-20 sm:bottom-24 left-2 right-2 sm:left-4 sm:right-4 z-[400]"
               >
                 <div className="bg-white/95 dark:bg-[#1E1F29]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                   {/* Header */}
                   <div className="flex justify-between items-center p-3 sm:p-4 border-b border-gray-100 dark:border-gray-800">
                     <div className="flex items-center gap-2">
                       <span className="material-icons text-blue-500 text-sm sm:text-base">radar</span>
                       <span className="font-bold text-xs sm:text-sm dark:text-white">{t('live_radar')}</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <span className="text-[10px] sm:text-xs text-gray-500">{new Date().toLocaleString()}</span>
                       <button
                         onClick={() => setShowInfo(!showInfo)}
                         className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center cursor-pointer"
                       >
                         <span className="material-icons text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                           {showInfo ? 'expand_more' : 'expand_less'}
                         </span>
                       </button>
                     </div>
                   </div>

                   {showInfo && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       transition={{ duration: 0.3 }}
                       className="p-3 sm:p-4"
                     >
                       {/* Main weather info */}
                       <div className="flex items-center justify-between mb-3 sm:mb-4">
                         <div className="flex items-center gap-3">
                           <span className="material-icons text-3xl sm:text-4xl text-yellow-500">
                             {weather.current.condition.toLowerCase().includes("rain") ? "water_drop" :
                              weather.current.condition.toLowerCase().includes("cloud") ? "cloud" :
                              weather.current.condition.toLowerCase().includes("thunder") ? "flash_on" :
                              weather.current.isDay ? "wb_sunny" : "nights_stay"}
                           </span>
                           <div>
                             <div className="text-2xl sm:text-3xl font-bold dark:text-white">{Math.round(weather.current.temperature)}°C</div>
                             <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{weather.current.condition}</div>
                           </div>
                         </div>
                         <div className="text-right">
                           <div className="text-xs text-gray-500">{t('feels_like')}</div>
                           <div className="text-base sm:text-lg font-semibold dark:text-white">{Math.round(weather.current.feelsLike)}°C</div>
                         </div>
                       </div>

                       {/* Weather details grid */}
                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                         <div className="bg-gray-50 dark:bg-[#2B2D3A] rounded-xl sm:rounded-2xl p-2.5 sm:p-3">
                           <div className="flex items-center gap-1.5 mb-1">
                             <span className="material-icons text-blue-400 text-xs sm:text-sm">water_drop</span>
                             <span className="text-[10px] sm:text-xs text-gray-500">{t('humidity')}</span>
                           </div>
                           <div className="font-bold text-sm sm:text-base dark:text-white">{weather.current.humidity}%</div>
                         </div>

                         <div className="bg-gray-50 dark:bg-[#2B2D3A] rounded-xl sm:rounded-2xl p-2.5 sm:p-3">
                           <div className="flex items-center gap-1.5 mb-1">
                             <span className="material-icons text-green-400 text-xs sm:text-sm">air</span>
                             <span className="text-[10px] sm:text-xs text-gray-500">{t('wind_speed')}</span>
                           </div>
                           <div className="font-bold text-sm sm:text-base dark:text-white">{weather.current.windSpeed} km/h</div>
                           <div className="text-[10px] sm:text-xs text-gray-400">{weather.current.windDirection}</div>
                         </div>

                         <div className="bg-gray-50 dark:bg-[#2B2D3A] rounded-xl sm:rounded-2xl p-2.5 sm:p-3">
                           <div className="flex items-center gap-1.5 mb-1">
                             <span className="material-icons text-purple-400 text-xs sm:text-sm">compress</span>
                             <span className="text-[10px] sm:text-xs text-gray-500">{t('pressure')}</span>
                           </div>
                           <div className="font-bold text-sm sm:text-base dark:text-white">{Math.round(weather.current.pressure)} hPa</div>
                         </div>

                         <div className="bg-gray-50 dark:bg-[#2B2D3A] rounded-xl sm:rounded-2xl p-2.5 sm:p-3">
                           <div className="flex items-center gap-1.5 mb-1">
                             <span className="material-icons text-orange-400 text-xs sm:text-sm">water</span>
                             <span className="text-[10px] sm:text-xs text-gray-500">{t('rain_probability')}</span>
                           </div>
                           <div className="font-bold text-sm sm:text-base dark:text-white">
                             {weather.hourly[0]?.rainChance ?? 0}%
                           </div>
                         </div>
                       </div>

                       {/* Air Quality */}
                       {weather.airQuality && (
                         <div className="mt-2 sm:mt-3 bg-gray-50 dark:bg-[#2B2D3A] rounded-xl sm:rounded-2xl p-2.5 sm:p-3">
                           <div className="flex items-center justify-between">
                             <div className="flex items-center gap-2">
                               <span className="material-icons text-teal-400 text-sm sm:text-base">air</span>
                               <div>
                                 <span className="text-xs sm:text-sm font-medium dark:text-white">{t('air_quality')}</span>
                                 <span className="text-[10px] sm:text-xs text-gray-500 ml-2">{weather.airQuality.description}</span>
                               </div>
                             </div>
                             <div className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold ${
                               weather.airQuality.aqi <= 50 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                               weather.airQuality.aqi <= 100 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                               'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                             }`}>
                               AQI {weather.airQuality.aqi}
                             </div>
                           </div>
                         </div>
                       )}

                       {/* Rain progress bar */}
                       <div className="mt-2 sm:mt-3">
                         <div className="flex justify-between items-center mb-1">
                           <span className="text-[10px] sm:text-xs text-gray-500">{t('rain_probability')}</span>
                           <span className="text-[10px] sm:text-xs font-medium dark:text-white">{weather.hourly[0]?.rainChance ?? 0}%</span>
                         </div>
                         <div className="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                           <motion.div
                             initial={{ width: 0 }}
                             animate={{ width: `${weather.hourly[0]?.rainChance ?? 0}%` }}
                             transition={{ duration: 1, delay: 0.5 }}
                             className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                           />
                         </div>
                       </div>
                     </motion.div>
                   )}
                 </div>
               </motion.div>
             )}
         </main>
         <Navigation />
      </div>
    </div>
  );
}
