"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";

const INDONESIAN_CITIES = [
    { name: "Jakarta", region: "DKI Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456 },
    { name: "Surabaya", region: "East Java", country: "Indonesia", lat: -7.2575, lon: 112.7521 },
    { name: "Bandung", region: "West Java", country: "Indonesia", lat: -6.9175, lon: 107.6191 },
    { name: "Medan", region: "North Sumatra", country: "Indonesia", lat: 3.5952, lon: 98.6722 },
    { name: "Semarang", region: "Central Java", country: "Indonesia", lat: -6.9666, lon: 110.4196 },
    { name: "Makassar", region: "South Sulawesi", country: "Indonesia", lat: -5.1477, lon: 119.4327 },
    { name: "Palembang", region: "South Sumatra", country: "Indonesia", lat: -2.9761, lon: 104.7754 },
    { name: "Denpasar", region: "Bali", country: "Indonesia", lat: -8.6500, lon: 115.2167 },
    { name: "Yogyakarta", region: "DIY", country: "Indonesia", lat: -7.7956, lon: 110.3695 },
    { name: "Malang", region: "East Java", country: "Indonesia", lat: -7.9666, lon: 112.6326 }
];

export default function CitiesPage() {
  const [filter, setFilter] = useState("");
  const router = useRouter();
  const { t } = useLanguage();

  const filteredCities = INDONESIAN_CITIES.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.region.toLowerCase().includes(filter.toLowerCase())
  );

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
            <h1 className="font-semibold text-base sm:text-lg dark:text-white">{t('cities')}</h1>
         </header>

         <div className="px-4 sm:px-6 mb-3 sm:mb-4">
             <div className="relative group w-full">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                    className="w-full bg-gray-100 dark:bg-[#1E1F29] rounded-xl sm:rounded-2xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#B2DAFF] transition-all border-none dark:text-white"
                    placeholder={t('filter_cities')}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
             </div>
         </div>

         <main className="flex-1 p-4 sm:p-6 overflow-y-auto pb-32 hide-scroll">
            <div className="space-y-3 sm:space-y-4">
                {filteredCities.map((city, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.03 * i }}
                      className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-[#1E1F29] rounded-xl sm:rounded-2xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2B2D3A] transition-colors"
                    >
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center text-lg sm:text-xl">🇮🇩</div>
                            <div>
                                <h3 className="font-semibold text-sm sm:text-base dark:text-white">{city.name}</h3>
                                <p className="text-[10px] sm:text-xs text-gray-500">{city.region}, {city.country}</p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </motion.div>
                ))}
            </div>
         </main>
         <Navigation />
      </motion.div>
    </div>
  );
}
