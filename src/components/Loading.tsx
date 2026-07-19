"use client";

import { motion } from "framer-motion";
import { CloudSun } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function Loading() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#0B0C15] gap-6">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-blue-400 dark:bg-blue-600 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ rotate: [-5, 5, -5], y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <CloudSun size={56} strokeWidth={1.5} className="text-blue-500 dark:text-blue-400 drop-shadow-lg" />
        </motion.div>
      </div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-sm text-gray-500 dark:text-gray-400 font-medium"
      >
        {t('loading')}
      </motion.p>
    </div>
  );
}
