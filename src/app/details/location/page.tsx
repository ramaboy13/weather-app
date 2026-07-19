"use client";

import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";

export default function LocationDetailPage() {
  const router = useRouter();
  const { t } = useLanguage();

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
              <span className="material-icons text-gray-600 dark:text-gray-300 text-sm sm:text-base">arrow_back</span>
            </button>
            <h1 className="font-semibold text-base sm:text-lg dark:text-white">{t('current_location')}</h1>
          </header>

          <main className="flex-1 p-4 sm:p-6 overflow-y-auto pb-24 hide-scroll">
             <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="bg-white dark:bg-[#1E1F29] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 shadow-sm text-center border border-gray-100 dark:border-transparent"
             >
                <span className="material-icons text-5xl sm:text-6xl text-[#B2DAFF] mb-4">location_city</span>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">Jakarta, Indonesia</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 text-left">
                    <div className="bg-gray-50 dark:bg-black/20 p-3 sm:p-4 rounded-xl">
                        <span className="text-xs text-gray-500 uppercase">{t('latitude')}</span>
                        <div className="font-mono text-sm sm:text-base dark:text-white">-6.2088</div>
                    </div>
                     <div className="bg-gray-50 dark:bg-black/20 p-3 sm:p-4 rounded-xl">
                        <span className="text-xs text-gray-500 uppercase">{t('longitude')}</span>
                        <div className="font-mono text-sm sm:text-base dark:text-white">106.8456</div>
                    </div>
                     <div className="bg-gray-50 dark:bg-black/20 p-3 sm:p-4 rounded-xl">
                        <span className="text-xs text-gray-500 uppercase">{t('timezone')}</span>
                        <div className="text-sm sm:text-base dark:text-white">Asia/Jakarta</div>
                    </div>
                     <div className="bg-gray-50 dark:bg-black/20 p-3 sm:p-4 rounded-xl">
                        <span className="text-xs text-gray-500 uppercase">{t('population')}</span>
                        <div className="text-sm sm:text-base dark:text-white">10.56 Million</div>
                    </div>
                </div>
             </motion.div>
          </main>

          <Navigation />
       </motion.div>
    </div>
  );
}
