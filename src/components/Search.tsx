"use client";

import { useState, useEffect } from "react";
import { Location } from "@/core/domain";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SearchProps {
  onLocationSelect: (location: Location) => void;
}

export function Search({ onLocationSelect }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 0) {
        try {
          const res = await fetch(`/api/search?q=${query}`);
          if (res.ok) {
            const data = await res.json();
            setResults(data);
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
      <span className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
        search
      </span>
      <input
        className="w-full bg-gray-100 dark:bg-[#1E1F29] rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-gray-500 dark:placeholder-gray-400 border-none dark:text-white"
        placeholder="Search city..."
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
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1E1F29] rounded-2xl shadow-xl overflow-hidden p-2 border border-gray-100 dark:border-gray-800"
          >
            {results.map((loc) => (
              <button
                key={loc.id}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors flex items-center gap-3"
                onClick={() => {
                  onLocationSelect(loc);
                  setQuery(`${loc.name}, ${loc.country}`);
                  setIsOpen(false);
                }}
              >
                 <span className="material-icons text-gray-400 text-sm">location_on</span>
                 <div>
                    <div className="text-sm font-semibold dark:text-white">{loc.name}</div>
                    <div className="text-xs text-gray-500">{loc.region ? `${loc.region}, ` : ""}{loc.country}</div>
                 </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
