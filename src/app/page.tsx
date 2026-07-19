"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Search } from "@/components/Search";
import { CurrentWeather } from "@/components/CurrentWeather";
import { ForecastRow } from "@/components/ForecastRow";
import { ChanceOfRain } from "@/components/ChanceOfRain";
import { LocalMapCard } from "@/components/LocalMapCard";
import { Navigation } from "@/components/Navigation";
import { Loading } from "@/components/Loading";
import { WeatherBackground } from "@/components/WeatherBackground";
import { Location, Weather } from "@/core/domain";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";
import { useLocation } from "@/components/location-provider";
import { Wind, Droplets, ArrowRight } from "lucide-react";

export default function Home() {
  const { location: geoLocation, loading: locationLoading } = useLocation();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [location, setLocation] = useState<Location>({
    id: "jakarta",
    name: "Jakarta",
    region: "DKI Jakarta",
    country: "Indonesia",
    latitude: -6.2088,
    longitude: 106.8456
  });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'today' | 'tomorrow' | 'week'>('today');
  const router = useRouter();
  const { t } = useLanguage();

  // Update location when geolocation is available
  useEffect(() => {
    if (geoLocation) {
      setLocation({
        id: `${geoLocation.latitude}-${geoLocation.longitude}`,
        name: geoLocation.city,
        region: geoLocation.region,
        country: geoLocation.country,
        latitude: geoLocation.latitude,
        longitude: geoLocation.longitude,
      });
    }
  }, [geoLocation]);

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

  if ((loading || locationLoading) && !weather) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex justify-center font-sans transition-colors duration-300 md:p-8 relative overflow-hidden">
      {weather && (
        <WeatherBackground condition={weather.current.condition} isDay={weather.current.isDay} />
      )}
       <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.4 }}
         className="w-full max-w-7xl bg-white/90 dark:bg-[#0B0C15]/90 backdrop-blur-sm md:rounded-[3rem] shadow-2xl overflow-hidden h-screen md:h-[calc(100vh-4rem)] relative flex flex-col border border-gray-100 dark:border-gray-800 z-10"
       >
          <Header locationName={`${location.name}, ${location.country}`} locationId={location.id} />

          <div className="px-4 sm:px-6 mb-4 sm:mb-6 max-w-2xl mx-auto w-full relative z-30">
             <Search onLocationSelect={setLocation} />
          </div>

          <main className="flex-1 overflow-y-auto px-4 sm:px-6 pb-24 hide-scroll">
             <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6 text-sm font-medium">
               <button
                  onClick={() => setView('today')}
                  className={cn("transition-colors pb-1 cursor-pointer", view === 'today' ? "text-gray-900 dark:text-white border-b-2 border-[#B2DAFF]" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")}
               >
                 {t('today')}
               </button>
               <button
                   onClick={() => router.push('/forecast')}
                   className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer"
               >
                 {t('tomorrow')}
               </button>
               <button
                   onClick={() => router.push('/forecast')}
                   className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer"
               >
                 {t('next_7_days')}
               </button>
             </div>

             {weather && (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                 <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                        <CurrentWeather weather={weather} />
                    </motion.div>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <ForecastRow hourly={weather.hourly} />
                    </motion.div>
                 </div>

                 <div className="lg:col-span-1 space-y-6 sm:space-y-8">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                        <Link href="/details/rain" className="block hover:scale-[1.02] transition-transform cursor-pointer">
                            <ChanceOfRain hourly={weather.hourly} />
                        </Link>
                    </motion.div>

                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
                        <LocalMapCard />
                    </motion.div>

                    {/* Other large cities */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-base sm:text-lg dark:text-white">{t('other_large_cities')}</h3>
                            <Link href="/cities" className="text-xs text-[#B2DAFF] font-medium hover:underline cursor-pointer">{t('show_all')} &gt;</Link>
                        </div>
                        <div className="bg-white dark:bg-[#1E1F29] p-3 sm:p-4 rounded-3xl flex items-center justify-between border border-gray-100 dark:border-transparent cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2B2D3A] transition-colors"
                            onClick={() => setLocation({
                                id: "bandung", name: "Bandung", region: "West Java", country: "Indonesia", latitude: -6.9175, longitude: 107.6191
                            })}
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="bg-red-100 dark:bg-red-500/20 p-2 rounded-2xl w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
                                    <span className="text-lg sm:text-xl">🇮🇩</span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5">Indonesia</p>
                                    <h4 className="font-semibold text-sm sm:text-base dark:text-white">Bandung</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t('rainy')}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-xl sm:text-2xl font-bold dark:text-white">24°</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Air Quality Button */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                        <Link href="/details/air-quality" className="bg-[#1E1F29] dark:bg-white text-white dark:text-black rounded-3xl p-4 sm:p-6 flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                           <div className="flex items-center gap-3 sm:gap-4">
                              <Wind size={28} className="group-hover:rotate-180 transition-transform duration-500" />
                              <div>
                                 <h3 className="font-bold text-base sm:text-lg">{t('air_quality')}</h3>
                                 <p className="text-xs opacity-70">{t('air_quality_desc')}</p>
                              </div>
                           </div>
                           <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                 </div>
               </div>
             )}
          </main>

          <Navigation />
       </motion.div>
    </div>
  );
}
