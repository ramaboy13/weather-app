"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";
import { Home, Map, Calendar, Settings } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const isActive = (path: string) => pathname === path;

  const items = [
    { href: "/", icon: Home, label: t('nav_home') },
    { href: "/map", icon: Map, label: t('nav_map') },
    { href: "/forecast", icon: Calendar, label: t('nav_forecast') },
    { href: "/settings", icon: Settings, label: t('nav_settings') },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-white dark:bg-[#1E1F29] border-t border-gray-100 dark:border-gray-800 px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center z-50 pb-4 sm:pb-6 rounded-t-2xl sm:rounded-t-3xl md:rounded-t-none md:rounded-b-3xl">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center gap-1 transition-colors cursor-pointer",
            isActive(item.href) ? "text-[#B2DAFF]" : "text-gray-400 hover:text-[#B2DAFF]"
          )}
        >
          <item.icon size={20} />
          <span className="text-[9px] sm:text-[10px] font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
