"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Header({ locationName, locationId }: { locationName: string, locationId?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="p-6 flex justify-between items-center sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1E1F29] flex items-center justify-center">
          <span className="material-icons text-gray-600 dark:text-gray-300 text-sm">grid_view</span>
        </div>
        <Link href="/details/location" className="flex flex-col hover:opacity-80 transition-opacity">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span className="material-icons text-[10px]">location_on</span> Current Location
          </span>
          <h2 className="font-semibold text-sm dark:text-white">{locationName}</h2>
        </Link>
      </div>

      <div className="flex gap-2">
         {mounted && (
            <button
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1E1F29] flex items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-[#2B2D3A]"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
                <span className="material-icons text-gray-600 dark:text-gray-300">
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
            </button>
         )}
      </div>
    </header>
  );
}
