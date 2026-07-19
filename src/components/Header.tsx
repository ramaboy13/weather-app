"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Grid3X3, MapPin, Sun, Moon, Monitor } from "lucide-react";

export function Header({ locationName, locationId }: { locationName: string, locationId?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <header className="p-4 sm:p-6 flex justify-between items-center sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-[#1E1F29] flex items-center justify-center cursor-pointer">
          <Grid3X3 size={18} className="text-gray-600 dark:text-gray-300" />
        </div>
        <Link href="/details/location" className="flex flex-col hover:opacity-80 transition-opacity cursor-pointer">
          <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <MapPin size={10} /> {t('current_location')}
          </span>
          <h2 className="font-semibold text-xs sm:text-sm dark:text-white">{locationName}</h2>
        </Link>
      </div>

      <div className="flex gap-2">
         {mounted && (
            <button
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-[#1E1F29] flex items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-[#2B2D3A] cursor-pointer"
                onClick={cycleTheme}
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? (
                  <Moon size={18} className="text-gray-600 dark:text-gray-300" />
                ) : theme === 'light' ? (
                  <Sun size={18} className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <Monitor size={18} className="text-gray-600 dark:text-gray-300" />
                )}
            </button>
         )}
      </div>
    </header>
  );
}
