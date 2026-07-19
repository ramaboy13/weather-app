"use client";

import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";

export default function AboutAppPage() {
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
            <h1 className="font-semibold text-base sm:text-lg dark:text-white">{t('about_title')}</h1>
          </header>

          <main className="flex-1 p-4 sm:p-6 overflow-y-auto pb-24 hide-scroll">
            <div className="max-w-3xl mx-auto">
              {/* App Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center mb-6 sm:mb-8"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#B2DAFF] rounded-3xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="material-icons text-4xl sm:text-5xl text-gray-900">wb_sunny</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold dark:text-white">Weather Dashboard</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{t('version')}</p>
              </motion.div>

              <div className="prose prose-sm dark:prose-invert max-w-none">
                {t('about_content').split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('Features:') || paragraph.startsWith('Fitur:') || paragraph.startsWith('Built with:') || paragraph.startsWith('Dibangun dengan:')) {
                    return (
                      <div key={i} className="mb-4 sm:mb-6">
                        <h3 className="font-semibold text-sm sm:text-base dark:text-white mb-2">{paragraph.split('\n')[0]}</h3>
                        <ul className="space-y-1">
                          {paragraph.split('\n').slice(1).filter(l => l.startsWith('•')).map((item, j) => (
                            <li key={j} className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                              <span className="text-[#B2DAFF] mt-0.5">•</span>
                              <span>{item.replace('• ', '')}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  if (paragraph.startsWith('Version:') || paragraph.startsWith('Versi:')) {
                    return null; // Already shown in the header
                  }
                  return <p key={i} className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{paragraph}</p>;
                })}
              </div>
            </div>
          </main>

          <Navigation />
       </motion.div>
    </div>
  );
}
