"use client";

import { Navigation } from "@/components/Navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-gray-100 dark:bg-[#0B0C15] min-h-screen flex justify-center font-sans transition-colors duration-300 md:p-8">
      <div className="w-full max-w-7xl bg-white dark:bg-[#0B0C15] md:rounded-[3rem] shadow-2xl overflow-hidden h-screen md:h-[calc(100vh-4rem)] relative flex flex-col border border-gray-100 dark:border-gray-800">
         <header className="p-6 flex items-center gap-4 sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
            <h1 className="font-semibold text-lg dark:text-white">Settings</h1>
         </header>
         <main className="flex-1 p-6 space-y-6">

            <section className="bg-gray-50 dark:bg-[#1E1F29] rounded-2xl p-4">
                <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Appearance</h2>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-icons text-gray-600 dark:text-gray-300">dark_mode</span>
                        <span className="dark:text-white">Dark Mode</span>
                    </div>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-[#B2DAFF]' : 'bg-gray-300'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${theme === 'dark' ? 'translate-x-6' : ''}`}></div>
                    </button>
                </div>
            </section>

            <section className="bg-gray-50 dark:bg-[#1E1F29] rounded-2xl p-4">
                <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase">General</h2>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="material-icons text-gray-600 dark:text-gray-300">language</span>
                        <span className="dark:text-white">Language</span>
                    </div>
                    <div className="flex bg-gray-200 dark:bg-black rounded-lg p-1">
                        <button
                           onClick={() => setLang('en')}
                           className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${lang === 'en' ? 'bg-white dark:bg-[#2B2D3A] shadow text-black dark:text-white' : 'text-gray-500'}`}
                        >
                           English
                        </button>
                        <button
                           onClick={() => setLang('id')}
                           className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${lang === 'id' ? 'bg-white dark:bg-[#2B2D3A] shadow text-black dark:text-white' : 'text-gray-500'}`}
                        >
                           Indonesia
                        </button>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 dark:bg-[#1E1F29] rounded-2xl p-4">
                <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase">About</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center cursor-pointer">
                        <span className="dark:text-white">Privacy Policy</span>
                        <span className="material-icons text-gray-400 text-sm">chevron_right</span>
                    </div>
                    <div className="flex justify-between items-center cursor-pointer">
                        <span className="dark:text-white">Terms of Service</span>
                        <span className="material-icons text-gray-400 text-sm">chevron_right</span>
                    </div>
                    <div className="flex justify-between items-center cursor-pointer">
                        <span className="dark:text-white">About App</span>
                        <span className="text-xs text-gray-500">v1.0.0</span>
                    </div>
                </div>
            </section>

         </main>
         <Navigation />
      </div>
    </div>
  );
}
