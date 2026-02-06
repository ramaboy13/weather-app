"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AirQuality } from "@/core/domain";
import { Loading } from "@/components/Loading";
import { useRouter } from "next/navigation";

export default function AirQualityPage() {
  const [aq, setAq] = useState<AirQuality | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Default Jakarta
  const lat = -6.2088;
  const lon = 106.8456;

  useEffect(() => {
    async function fetchAQ() {
      try {
        const res = await fetch(`/api/air-quality?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        setAq(data);
      } finally {
        setLoading(false);
      }
    }
    fetchAQ();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="bg-gray-100 dark:bg-[#0B0C15] min-h-screen flex justify-center font-sans transition-colors duration-300 md:p-8">
      <div className="w-full max-w-7xl bg-white dark:bg-[#0B0C15] md:rounded-[3rem] shadow-2xl overflow-hidden h-screen md:h-[calc(100vh-4rem)] relative flex flex-col border border-gray-100 dark:border-gray-800">
         <header className="p-6 flex items-center gap-4 sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
            <button onClick={() => router.back()} className="material-icons text-gray-600 dark:text-gray-300">arrow_back</button>
            <h1 className="font-semibold text-lg dark:text-white">Air Quality</h1>
         </header>
         <main className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            {aq && (
                <>
                    <div className={`w-48 h-48 rounded-full flex flex-col items-center justify-center mb-8 border-8 ${
                        aq.aqi <= 50 ? 'border-green-400 text-green-500' :
                        aq.aqi <= 100 ? 'border-yellow-400 text-yellow-500' :
                        'border-red-400 text-red-500'
                    }`}>
                        <span className="text-6xl font-bold">{aq.aqi}</span>
                        <span className="text-sm font-medium mt-2">AQI</span>
                    </div>
                    <h2 className="text-3xl font-bold dark:text-white mb-2">{aq.description}</h2>
                    <p className="text-gray-500 max-w-xs mx-auto mb-8">
                        {aq.aqi <= 50 ? "Air quality is satisfactory, and air pollution poses little or no risk." :
                         aq.aqi <= 100 ? "Air quality is acceptable. However, there may be a risk for some people." :
                         "Members of sensitive groups may experience health effects. The general public is less likely to be affected."}
                    </p>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                        <div className="bg-gray-50 dark:bg-[#1E1F29] p-4 rounded-2xl">
                            <div className="text-xs text-gray-500 mb-1">PM 2.5</div>
                            <div className="text-xl font-bold dark:text-white">{aq.pm2_5}</div>
                        </div>
                         <div className="bg-gray-50 dark:bg-[#1E1F29] p-4 rounded-2xl">
                            <div className="text-xs text-gray-500 mb-1">PM 10</div>
                            <div className="text-xl font-bold dark:text-white">{aq.pm10}</div>
                        </div>
                    </div>
                </>
            )}
         </main>
         <Navigation />
      </div>
    </div>
  );
}
