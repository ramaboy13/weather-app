"use client";

import { use } from "react";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";

export default function DetailPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = use(params);
  const router = useRouter();

  return (
    <div className="bg-gray-100 dark:bg-[#0B0C15] min-h-screen flex justify-center font-sans transition-colors duration-300">
       <div className="w-full max-w-md bg-white dark:bg-[#0B0C15] shadow-2xl overflow-hidden min-h-screen relative flex flex-col">
          <header className="p-6 flex items-center gap-4 sticky top-0 z-20 bg-white/80 dark:bg-[#0B0C15]/80 backdrop-blur-md">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1E1F29] flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <span className="material-icons text-gray-600 dark:text-gray-300">arrow_back</span>
            </button>
            <h1 className="font-semibold text-lg capitalize dark:text-white">{type} Details</h1>
          </header>

          <main className="flex-1 p-6">
             <div className="bg-white dark:bg-[#1E1F29] rounded-[2rem] p-8 shadow-sm text-center border border-gray-100 dark:border-transparent">
                <span className="material-icons text-6xl text-[#B2DAFF] mb-4">
                  {type === 'wind' ? 'air' : type === 'rain' ? 'water_drop' : 'location_on'}
                </span>
                <h2 className="text-2xl font-bold mb-2 capitalize dark:text-white">{type}</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Detailed information about {type} will appear here. This is a placeholder for the {type} module.
                </p>
             </div>
          </main>

          <Navigation />
       </div>
    </div>
  );
}
