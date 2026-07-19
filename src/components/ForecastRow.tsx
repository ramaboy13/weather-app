import { HourlyForecast } from "@/core/domain";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Sun, Cloud, CloudRain, Snowflake, Zap, CloudFog } from "lucide-react";

interface ForecastRowProps {
  hourly: HourlyForecast[];
}

function getConditionIcon(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes("rain") || c.includes("shower")) return <CloudRain size={20} className="text-blue-400" />;
  if (c.includes("thunder")) return <Zap size={20} className="text-yellow-400" />;
  if (c.includes("snow")) return <Snowflake size={20} className="text-blue-200" />;
  if (c.includes("cloud") || c.includes("overcast")) return <Cloud size={20} className="text-gray-400" />;
  if (c.includes("fog")) return <CloudFog size={20} className="text-gray-400" />;
  return <Sun size={20} className="text-yellow-500" />;
}

export function ForecastRow({ hourly }: ForecastRowProps) {
  const { t } = useLanguage();

  // Show next 24 hours from current hour
  const now = new Date();
  const currentHour = now.getHours();
  const upcoming = hourly.filter(h => {
    const hHour = new Date(h.time).getHours();
    const hDate = new Date(h.time).toDateString();
    const today = now.toDateString();
    if (hDate === today) return hHour >= currentHour;
    return true;
  }).slice(0, 24);

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <Link href="/forecast" className="font-semibold text-base sm:text-lg dark:text-white hover:text-[#B2DAFF] transition-colors cursor-pointer">{t('hourly_forecast')}</Link>
        <div className="flex bg-gray-100 dark:bg-[#1E1F29] rounded-lg p-1">
          <Link href="/forecast" className="bg-white dark:bg-[#2B2D3A] shadow-sm text-xs px-3 py-1 rounded-md font-medium dark:text-white transition-colors cursor-pointer">{t('forecast_btn')}</Link>
          <Link href="/details/air-quality" className="text-gray-500 dark:text-gray-400 text-xs px-3 py-1 rounded-md font-medium hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">{t('air_quality_btn')}</Link>
        </div>
      </div>
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 hide-scroll">
        {upcoming.map((hour, i) => (
          <div key={i} className={cn(
            "rounded-2xl sm:rounded-3xl p-2 sm:p-3 flex flex-col items-center justify-between h-24 sm:h-28 min-w-[64px] sm:min-w-[72px] border transition-all cursor-default hover:scale-105 flex-shrink-0",
            i === 0
              ? "bg-[#2B2D3A] text-white border-gray-700 shadow-lg transform scale-105"
              : "bg-white dark:bg-[#1E1F29] border-gray-100 dark:border-transparent"
          )}>
            <span className={cn("text-[10px] sm:text-xs", i === 0 ? "font-medium" : "text-gray-500 dark:text-gray-400")}>
              {i === 0 ? t('now') : `${new Date(hour.time).getHours()}:00`}
            </span>
            {getConditionIcon(hour.condition)}
            <span className={cn("font-bold text-sm sm:text-base", i === 0 ? "text-white" : "text-gray-800 dark:text-white")}>
              {Math.round(hour.temperature)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
