import { HourlyForecast } from "@/core/domain";
import { cn } from "@/lib/utils";

interface ChanceOfRainProps {
  hourly: HourlyForecast[];
}

export function ChanceOfRain({ hourly }: ChanceOfRainProps) {
  const data = hourly.slice(0, 6);

  return (
    <div className="mb-8 bg-white dark:bg-[#1E1F29] p-5 rounded-3xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold dark:text-white">Chance of rain</h3>
        <span className="text-xs text-gray-400">Today</span>
      </div>
      <div className="flex items-end justify-between h-32 gap-2">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 w-full">
            <div className="w-2 bg-gray-200 dark:bg-gray-700 h-24 rounded-full relative overflow-hidden">
              <div
                className="absolute bottom-0 w-full bg-[#B2DAFF] transition-all duration-500"
                style={{ height: `${item.rainChance}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-gray-400">
              {new Date(item.time).getHours()} {new Date(item.time).getHours() >= 12 ? 'PM' : 'AM'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
