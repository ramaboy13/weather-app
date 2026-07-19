import { HourlyForecast } from "@/core/domain";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";
import { CloudRain } from "lucide-react";

interface ChanceOfRainProps {
  hourly: HourlyForecast[];
  currentTime: string;
}

export function ChanceOfRain({ hourly, currentTime }: ChanceOfRainProps) {
  const now = new Date(currentTime);
  const upcoming = hourly.filter(h => {
    const hDate = new Date(h.time);
    return hDate.getTime() >= now.getTime() - (now.getMinutes() * 60000);
  });
  const data = upcoming.slice(0, 6);
  const { t } = useLanguage();

  return (
    <div className="mb-6 sm:mb-8 bg-white dark:bg-[#1E1F29] p-4 sm:p-5 rounded-2xl sm:rounded-3xl">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="font-semibold text-sm sm:text-base dark:text-white flex items-center gap-2">
          <CloudRain size={16} className="text-blue-400" />
          {t('chance_of_rain')}
        </h3>
        <span className="text-xs text-gray-400">{t('today')}</span>
      </div>
      <div className="flex items-end justify-between h-28 sm:h-32 gap-1 sm:gap-2">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1 sm:gap-2 w-full group cursor-pointer" title={`${item.rainChance}% chance of rain at ${new Date(item.time).getHours()}:00`}>
            {item.rainChance > 0 && (
              <span className="text-[9px] sm:text-[10px] font-medium text-blue-500 dark:text-blue-400">
                {item.rainChance}%
              </span>
            )}
            <div className="w-1.5 sm:w-2 bg-gray-200 dark:bg-gray-700 h-20 sm:h-24 rounded-full relative overflow-hidden">
              <div
                className={cn(
                  "absolute bottom-0 w-full transition-all duration-500 rounded-full",
                  item.rainChance > 70 ? "bg-blue-600" :
                  item.rainChance > 40 ? "bg-blue-400" :
                  "bg-[#B2DAFF]"
                )}
                style={{ height: `${item.rainChance}%` }}
              ></div>
            </div>
            <span className="text-[8px] sm:text-[10px] text-gray-400">
              {new Date(item.time).getHours()} {new Date(item.time).getHours() >= 12 ? 'PM' : 'AM'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
