"use client";

import { use } from "react";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import { ArrowLeft, Wind, Droplets, MapPin } from "lucide-react";

export default function DetailPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = use(params);
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
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="font-semibold text-base sm:text-lg capitalize dark:text-white">{type} {t('details')}</h1>
          </header>

          <main className="flex-1 p-4 sm:p-6 overflow-y-auto pb-32 hide-scroll">
             <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="bg-white dark:bg-[#1E1F29] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 shadow-sm text-center border border-gray-100 dark:border-transparent"
             >
                <div className="flex justify-center mb-4 text-[#B2DAFF]">
                  {type === 'wind' ? <Wind className="w-12 h-12 sm:w-14 sm:h-14" /> : 
                   type === 'rain' ? <Droplets className="w-12 h-12 sm:w-14 sm:h-14" /> : 
                   <MapPin className="w-12 h-12 sm:w-14 sm:h-14" />}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 capitalize dark:text-white">{type}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('detail_placeholder')}
                </p>
             </motion.div>
          </main>

          <Navigation />
       </motion.div>
    </div>
  );
}
