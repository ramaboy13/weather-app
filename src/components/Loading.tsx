"use client";

import { motion } from "framer-motion";

export function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0B0C15]">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[#B2DAFF] rounded-full blur-xl opacity-50"
        />
        <motion.img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbUMzUBFbeN_1UoDh6ObmmJR5ltnGKAYARS-2h1_Eo_GtW9WzkKu_WP7x0jnugnZ5BS_xhkC1ydjzJm5cVHScfnhN1OvtRX5zIffCy2ZTBM7UPZJmxMgYoKTd3dwCTPdL0Av-F3gDYsYDB9bztlBcyru9sr2AJGMVdRGD1XZdkZs3nxhkNxLBLSJG4RilInnJik8g0Ybt6Rsw8yHycXx_17PmtqJhXnJq_6eO3Ssv5_jbfYPI0tV6vCHHntNm8GxWrs5PiewRAVU_v"
          alt="Loading Weather"
          className="w-20 h-20 object-contain relative z-10"
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
