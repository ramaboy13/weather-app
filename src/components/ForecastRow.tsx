import { HourlyForecast } from "@/core/domain";
import { cn } from "@/lib/utils";

interface ForecastRowProps {
  hourly: HourlyForecast[];
}

export function ForecastRow({ hourly }: ForecastRowProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg dark:text-white">Hourly Forecast</h3>
        <div className="flex bg-gray-100 dark:bg-[#1E1F29] rounded-lg p-1">
          <button className="bg-white dark:bg-[#2B2D3A] shadow-sm text-xs px-3 py-1 rounded-md font-medium dark:text-white">Forecast</button>
          <button className="text-gray-500 dark:text-gray-400 text-xs px-3 py-1 rounded-md font-medium hover:text-gray-900 dark:hover:text-white transition-colors">Air quality</button>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scroll -mx-6 px-6">
        {hourly.map((hour, i) => (
          <div key={i} className={cn(
            "flex-shrink-0 w-16 rounded-3xl p-3 flex flex-col items-center justify-between h-28 border transition-all",
            i === 0
              ? "bg-[#2B2D3A] text-white border-gray-700 shadow-lg transform scale-105"
              : "bg-white dark:bg-[#1E1F29] border-gray-100 dark:border-transparent"
          )}>
            <span className={cn("text-xs", i === 0 ? "font-medium" : "text-gray-500 dark:text-gray-400")}>
              {new Date(hour.time).getHours()}:00
            </span>
            <span className="material-icons text-xl text-yellow-500">
               {hour.condition.toLowerCase().includes("sunny") ? "wb_sunny" :
                hour.condition.toLowerCase().includes("cloud") ? "cloud" :
                hour.condition.toLowerCase().includes("rain") ? "water_drop" : "wb_sunny"}
            </span>
            <span className={cn("font-bold", i === 0 ? "text-white" : "text-gray-800 dark:text-white")}>
              {Math.round(hour.temperature)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
