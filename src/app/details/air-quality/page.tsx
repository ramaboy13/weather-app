"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AirQuality } from "@/core/domain";
import { Loading } from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { useLocation } from "@/components/location-provider";

export default function AirQualityPage() {
  const { location, loading: locationLoading } = useLocation();
  const [aq, setAq] = useState<AirQuality | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (!location) return;
    async function fetchAQ() {
      try {
        const res = await fetch(`/api/air-quality?lat=${location.latitude}&lon=${location.longitude}`);
        const data = await res.json();
        setAq(data);
      } finally {
        setLoading(false);
      }
    }
    fetchAQ();
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
            <button onClick={() => router.back()} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-[#1E1F29] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#2B2D3A] transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="font-semibold text-base sm:text-lg dark:text-white">{t('air_quality')}</h1>
         </header>
         <main className="flex-1 p-4 sm:p-6 flex flex-col items-center justify-center text-center overflow-y-auto pb-32 hide-scroll">
            {aq && (
                <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                      className={`w-36 h-36 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center mb-6 sm:mb-8 border-8 ${
                        aq.aqi <= 50 ? 'border-green-400 text-green-500' :
                        aq.aqi <= 100 ? 'border-yellow-400 text-yellow-500' :
                        'border-red-400 text-red-500'
                    }`}>
                        <span className="text-4xl sm:text-6xl font-bold">{aq.aqi}</span>
                        <span className="text-xs sm:text-sm font-medium mt-2">AQI</span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-bold dark:text-white mb-2">{aq.description}</h2>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto mb-6 sm:mb-8">
                        {aq.aqi <= 50 ? t('aqi_desc_good') :
                         aq.aqi <= 100 ? t('aqi_desc_moderate') :
                         t('aqi_desc_unhealthy')}
                    </p>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm">
                        <div className="bg-gray-50 dark:bg-[#1E1F29] p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                            <div className="text-xs text-gray-500 mb-1">{t('pm25')}</div>
                            <div className="text-lg sm:text-xl font-bold dark:text-white">{aq.pm2_5}</div>
                        </div>
                         <div className="bg-gray-50 dark:bg-[#1E1F29] p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                            <div className="text-xs text-gray-500 mb-1">{t('pm10')}</div>
                            <div className="text-lg sm:text-xl font-bold dark:text-white">{aq.pm10}</div>
                        </div>
                    </div>
                </>
            )}
         </main>
         <Navigation />
      </motion.div>
    </div>
  );
}
