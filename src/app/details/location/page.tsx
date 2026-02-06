"use client";

import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";

export default function LocationDetailPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 dark:bg-[#0B0C15] min-h-screen flex justify-center font-sans transition-colors duration-300 md:p-8">
       <div className="w-full max-w-7xl bg-white dark:bg-[#0B0C15] md:rounded-[3rem] shadow-2xl overflow-hidden h-screen md:h-[calc(100vh-4rem)] relative flex flex-col border border-gray-100 dark:border-gray-800">
          <header className="p-6 flex items-center gap-4 sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1E1F29] flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <span className="material-icons text-gray-600 dark:text-gray-300">arrow_back</span>
            </button>
            <h1 className="font-semibold text-lg dark:text-white">Location Details</h1>
          </header>

          <main className="flex-1 p-6">
             <div className="bg-white dark:bg-[#1E1F29] rounded-[2rem] p-8 shadow-sm text-center border border-gray-100 dark:border-transparent">
                <span className="material-icons text-6xl text-[#B2DAFF] mb-4">location_city</span>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Jakarta, Indonesia</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
                    <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl">
                        <span className="text-xs text-gray-500 uppercase">Latitude</span>
                        <div className="font-mono dark:text-white">-6.2088</div>
                    </div>
                     <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl">
                        <span className="text-xs text-gray-500 uppercase">Longitude</span>
                        <div className="font-mono dark:text-white">106.8456</div>
                    </div>
                     <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl">
                        <span className="text-xs text-gray-500 uppercase">Timezone</span>
                        <div className="dark:text-white">Asia/Jakarta</div>
                    </div>
                     <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl">
                        <span className="text-xs text-gray-500 uppercase">Population</span>
                        <div className="dark:text-white">10.56 Million</div>
                    </div>
                </div>
             </div>
          </main>

          <Navigation />
       </div>
    </div>
  );
}
