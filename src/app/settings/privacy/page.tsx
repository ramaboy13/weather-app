"use client";

import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
            <h1 className="font-semibold text-base sm:text-lg dark:text-white">{t('privacy_title')}</h1>
          </header>

          <main className="flex-1 p-4 sm:p-6 overflow-y-auto pb-24 hide-scroll">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs text-gray-400 mb-4 sm:mb-6">{t('privacy_last_updated')}</p>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {t('privacy_content').split('\n\n').map((paragraph, i) => {
                  if (paragraph.match(/^\d+\./)) {
                    const [title, ...rest] = paragraph.split('\n');
                    return (
                      <div key={i} className="mb-4 sm:mb-6">
                        <h3 className="font-semibold text-sm sm:text-base dark:text-white mb-2">{title}</h3>
                        {rest.length > 0 && (
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{rest.join(' ')}</p>
                        )}
                      </div>
                    );
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
