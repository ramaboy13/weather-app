"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header({ locationName }: { locationName: string }) {
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
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span className="material-icons text-[10px]">location_on</span> Current Location
          </span>
          <h2 className="font-semibold text-sm dark:text-white">{locationName}</h2>
        </div>
      </div>

      <div className="flex gap-2">
         {mounted && (
            <button
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1E1F29] flex items-center justify-center transition-colors"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
                <span className="material-icons text-gray-600 dark:text-gray-300">
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
            </button>
         )}
         <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1E1F29] overflow-hidden border-2 border-transparent hover:border-[#B2DAFF] transition-colors cursor-pointer">
           <img
             alt="User Profile"
             className="w-full h-full object-cover"
             src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWmWN8EE1jhhKmz95hh8dB6XO-nFXNdfoKI8vTUrQuEoJWAtMqKqDBMHtarCqgVPVztC5rYFTgIFzg2NVhQGecYoJsEOBFcVjja_GsqH6RtUHx2ouudSAXV0-8n_5wieXXhY3SMOauwP9-f059Tmxyh21Mug9pvfRNXAZ_hivOtj4if-2rR9SjgZ_3ygyHlxS1ReL0nL9N7GH-nUNo6EuiSgyGFpSEBtUdBmjCjKJsRCDRE5P5mz33_58BU3nZja9SVrFh6HWQTmNx"
           />
         </div>
      </div>
    </header>
  );
}
