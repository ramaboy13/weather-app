"use client";

import { useState, useEffect } from "react";
import { Location } from "@/core/domain";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

import { Search as SearchIcon, MapPin } from "lucide-react";

interface SearchProps {
  onLocationSelect: (location: Location) => void;
}

export function Search({ onLocationSelect }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 0) {
        try {
          const res = await fetch(`/api/search?q=${query}`);
          if (res.ok) {
            const data: Location[] = await res.json();
            // Prioritize Indonesian results - sort Indonesia first
            const sorted = data.sort((a, b) => {
              const aIsIndonesia = a.country?.toLowerCase().includes("indonesia") ? 0 : 1;
              const bIsIndonesia = b.country?.toLowerCase().includes("indonesia") ? 0 : 1;
              return aIsIndonesia - bIsIndonesia;
            });
            setResults(sorted);
            setIsOpen(true);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative group w-full z-50">
      <SearchIcon size={18} className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
      <input
        className="w-full bg-gray-100 dark:bg-[#1E1F29] rounded-xl sm:rounded-2xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-gray-500 dark:placeholder-gray-400 border-none dark:text-white"
        placeholder={t('search_city')}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length > 0 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1E1F29] rounded-xl sm:rounded-2xl shadow-xl overflow-hidden p-2 border border-gray-100 dark:border-gray-800 max-h-64 overflow-y-auto"
          >
            {results.map((loc) => {
              const isIndonesia = loc.country?.toLowerCase().includes("indonesia");
              return (
                <button
                  key={loc.id}
                  className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg sm:rounded-xl transition-colors flex items-center gap-2 sm:gap-3 cursor-pointer"
                  onClick={() => {
                    onLocationSelect(loc);
                    setQuery(`${loc.name}, ${loc.country}`);
                    setIsOpen(false);
                  }}
                >
                   <MapPin size={14} className="text-gray-400" />
                   <div className="flex-1">
                      <div className="text-xs sm:text-sm font-semibold dark:text-white">{loc.name}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{loc.region ? `${loc.region}, ` : ""}{loc.country}</div>
                   </div>
                   {isIndonesia && (
                      <span className="text-sm">🇮🇩</span>
                   )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
