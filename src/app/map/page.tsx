"use client";

import dynamic from "next/dynamic";
import { Navigation } from "@/components/Navigation";

const MapComponent = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">Loading Map...</div>
});

export default function MapPage() {
  // Default to Jakarta
  const lat = -6.2088;
  const lon = 106.8456;

  return (
    <div className="bg-gray-100 dark:bg-[#0B0C15] min-h-screen flex justify-center font-sans transition-colors duration-300 md:p-8">
      <div className="w-full max-w-7xl bg-white dark:bg-[#0B0C15] md:rounded-[3rem] shadow-2xl overflow-hidden h-screen md:h-[calc(100vh-4rem)] relative flex flex-col border border-gray-100 dark:border-gray-800">
         <header className="p-6 flex items-center gap-4 sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
            <h1 className="font-semibold text-lg dark:text-white">Weather Map</h1>
         </header>
         <main className="flex-1 relative z-0">
             <div className="h-full w-full min-h-[500px]">
                <MapComponent lat={lat} lon={lon} />
             </div>
             {/* Overlay for time/day simulation */}
             <div className="absolute bottom-24 left-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur p-4 rounded-xl z-[400] shadow-lg">
                <div className="flex justify-between items-center text-sm">
                    <span className="font-bold dark:text-white">Live Radar</span>
                    <span className="text-gray-500">{new Date().toLocaleString()}</span>
                </div>
                <div className="mt-2 h-1 bg-gray-200 rounded overflow-hidden">
                    <div className="h-full bg-blue-500 w-2/3 animate-pulse"></div>
                </div>
             </div>
         </main>
         <Navigation />
      </div>
    </div>
  );
}
