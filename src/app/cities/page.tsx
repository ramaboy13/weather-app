"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";

const INDONESIAN_CITIES = [
    { name: "Jakarta", region: "DKI Jakarta", country: "Indonesia" },
    { name: "Surabaya", region: "East Java", country: "Indonesia" },
    { name: "Bandung", region: "West Java", country: "Indonesia" },
    { name: "Medan", region: "North Sumatra", country: "Indonesia" },
    { name: "Semarang", region: "Central Java", country: "Indonesia" },
    { name: "Makassar", region: "South Sulawesi", country: "Indonesia" },
    { name: "Palembang", region: "South Sumatra", country: "Indonesia" },
    { name: "Denpasar", region: "Bali", country: "Indonesia" },
    { name: "Yogyakarta", region: "DIY", country: "Indonesia" },
    { name: "Malang", region: "East Java", country: "Indonesia" }
];

export default function CitiesPage() {
  const [filter, setFilter] = useState("");
  const router = useRouter();

  const filteredCities = INDONESIAN_CITIES.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.region.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-gray-100 dark:bg-[#0B0C15] min-h-screen flex justify-center font-sans transition-colors duration-300 md:p-8">
      <div className="w-full max-w-7xl bg-white dark:bg-[#0B0C15] md:rounded-[3rem] shadow-2xl overflow-hidden h-screen md:h-[calc(100vh-4rem)] relative flex flex-col border border-gray-100 dark:border-gray-800">
         <header className="p-6 flex items-center gap-4 sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
            <button onClick={() => router.back()} className="material-icons text-gray-600 dark:text-gray-300">arrow_back</button>
            <h1 className="font-semibold text-lg dark:text-white">Cities</h1>
         </header>

         <div className="px-6 mb-4">
             <div className="relative group w-full">
                <span className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
                <input
                    className="w-full bg-gray-100 dark:bg-[#1E1F29] rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#B2DAFF] transition-all border-none dark:text-white"
                    placeholder="Filter cities..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
             </div>
         </div>

         <main className="flex-1 p-6 overflow-y-auto pb-24">
            <div className="space-y-4">
                {filteredCities.map((city, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1E1F29] rounded-2xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2B2D3A] transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">🇮🇩</div>
                            <div>
                                <h3 className="font-semibold dark:text-white">{city.name}</h3>
                                <p className="text-xs text-gray-500">{city.region}, {city.country}</p>
                            </div>
                        </div>
                        <span className="material-icons text-gray-400">chevron_right</span>
                    </div>
                ))}
            </div>
         </main>
         <Navigation />
      </div>
    </div>
  );
}
