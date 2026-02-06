"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="absolute bottom-0 w-full bg-white dark:bg-[#1E1F29] border-t border-gray-100 dark:border-gray-800 px-8 py-4 flex justify-between items-center z-50 pb-6 rounded-t-3xl md:rounded-t-none md:rounded-b-3xl">
      <Link href="/" className={cn("flex flex-col items-center gap-1 transition-colors", isActive('/') ? "text-[#B2DAFF]" : "text-gray-400 hover:text-[#B2DAFF]")}>
        <span className="material-icons">home</span>
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      <Link href="/map" className={cn("flex flex-col items-center gap-1 transition-colors", isActive('/map') ? "text-[#B2DAFF]" : "text-gray-400 hover:text-[#B2DAFF]")}>
        <span className="material-icons">map</span>
        <span className="text-[10px] font-medium">Map</span>
      </Link>
      <Link href="/forecast" className={cn("flex flex-col items-center gap-1 transition-colors", isActive('/forecast') ? "text-[#B2DAFF]" : "text-gray-400 hover:text-[#B2DAFF]")}>
        <span className="material-icons">calendar_today</span>
        <span className="text-[10px] font-medium">Forecast</span>
      </Link>
      <Link href="/settings" className={cn("flex flex-col items-center gap-1 transition-colors", isActive('/settings') ? "text-[#B2DAFF]" : "text-gray-400 hover:text-[#B2DAFF]")}>
        <span className="material-icons">settings</span>
        <span className="text-[10px] font-medium">Settings</span>
      </Link>
    </nav>
  );
}
