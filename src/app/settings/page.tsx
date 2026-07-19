"use client";

import { Navigation } from "@/components/Navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Moon, Globe, ChevronRight, Shield, FileText, Info } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex justify-center font-sans transition-colors duration-300 md:p-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-7xl bg-white dark:bg-[#0B0C15] md:rounded-[3rem] shadow-2xl overflow-hidden h-screen md:h-[calc(100vh-4rem)] relative flex flex-col border border-gray-100 dark:border-gray-800"
      >
         <header className="p-4 sm:p-6 flex items-center gap-3 sm:gap-4 sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
            <h1 className="font-semibold text-base sm:text-lg dark:text-white">{t('settings')}</h1>
         </header>
         <main className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto pb-32 hide-scroll">

            {/* Appearance Section */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 dark:bg-[#1E1F29] rounded-xl sm:rounded-2xl p-3 sm:p-4"
            >
                <h2 className="text-xs sm:text-sm font-semibold text-gray-500 mb-3 sm:mb-4 uppercase">{t('appearance')}</h2>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Moon size={18} className="text-gray-600 dark:text-gray-300" />
                        <span className="text-sm sm:text-base dark:text-white">{t('dark_mode')}</span>
                    </div>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className={`w-11 sm:w-12 h-5 sm:h-6 rounded-full p-1 transition-colors cursor-pointer ${resolvedTheme === 'dark' ? 'bg-[#B2DAFF]' : 'bg-gray-300'}`}
                    >
                        <div className={`w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-white shadow-md transform transition-transform ${resolvedTheme === 'dark' ? 'translate-x-5 sm:translate-x-6' : ''}`}></div>
                    </button>
                </div>
            </motion.section>

            {/* General Section */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 dark:bg-[#1E1F29] rounded-xl sm:rounded-2xl p-3 sm:p-4"
            >
                <h2 className="text-xs sm:text-sm font-semibold text-gray-500 mb-3 sm:mb-4 uppercase">{t('general')}</h2>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Globe size={18} className="text-gray-600 dark:text-gray-300" />
                        <span className="text-sm sm:text-base dark:text-white">{t('language')}</span>
                    </div>
                    <div className="flex bg-gray-200 dark:bg-black rounded-lg p-1">
                        <button
                           onClick={() => setLocale('en')}
                           className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${locale === 'en' ? 'bg-white dark:bg-[#2B2D3A] shadow text-black dark:text-white' : 'text-gray-500'}`}
                        >
                           English
                        </button>
                        <button
                           onClick={() => setLocale('id')}
                           className={`px-2.5 sm:px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${locale === 'id' ? 'bg-white dark:bg-[#2B2D3A] shadow text-black dark:text-white' : 'text-gray-500'}`}
                        >
                           Indonesia
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* About Section */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 dark:bg-[#1E1F29] rounded-xl sm:rounded-2xl p-3 sm:p-4"
            >
                <h2 className="text-xs sm:text-sm font-semibold text-gray-500 mb-3 sm:mb-4 uppercase">{t('about')}</h2>
                <div className="space-y-3 sm:space-y-4">
                    <Link href="/settings/privacy" className="flex justify-between items-center cursor-pointer group">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Shield size={16} className="text-gray-400" />
                          <span className="text-sm sm:text-base dark:text-white group-hover:text-[#B2DAFF] transition-colors">{t('privacy_policy')}</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                    </Link>
                    <Link href="/settings/terms" className="flex justify-between items-center cursor-pointer group">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <FileText size={16} className="text-gray-400" />
                          <span className="text-sm sm:text-base dark:text-white group-hover:text-[#B2DAFF] transition-colors">{t('terms_of_service')}</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                    </Link>
                    <Link href="/settings/about" className="flex justify-between items-center cursor-pointer group">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Info size={16} className="text-gray-400" />
                          <span className="text-sm sm:text-base dark:text-white group-hover:text-[#B2DAFF] transition-colors">{t('about_app')}</span>
                        </div>
                        <span className="text-xs text-gray-500">{t('version')}</span>
                    </Link>
                </div>
            </motion.section>

         </main>
         <Navigation />
      </motion.div>
    </div>
  );
}
