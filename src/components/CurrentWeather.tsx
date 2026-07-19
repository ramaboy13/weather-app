import { Weather } from "@/core/domain";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Thermometer, Wind, Gauge, Droplets, Eye, CloudSun } from "lucide-react";

interface CurrentWeatherProps {
  weather: Weather;
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  const { current } = weather;
  const { t } = useLanguage();

  const getWeatherIcon = () => {
    const c = current.condition.toLowerCase();
    if (c.includes("rain") || c.includes("shower")) return "🌧️";
    if (c.includes("thunder")) return "⛈️";
    if (c.includes("snow")) return "❄️";
    if (c.includes("cloud") || c.includes("overcast")) return "☁️";
    if (c.includes("fog")) return "🌫️";
    return current.isDay ? "☀️" : "🌙";
  };

  return (
    <div className="bg-[#B2DAFF] dark:bg-gradient-to-br dark:from-[#1a2a4a] dark:to-[#0d1b2a] text-gray-900 dark:text-white rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 mb-4 sm:mb-6 relative overflow-hidden shadow-lg shadow-blue-500/20 group hover:shadow-blue-500/30 transition-shadow">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 dark:bg-blue-500/10 rounded-full blur-2xl"></div>

      <div className="flex justify-between items-start mb-6 sm:mb-8 relative z-10">
        <div>
          <h3 className="font-semibold text-base sm:text-lg">{t('today')}</h3>
          <p className="text-xs sm:text-sm opacity-70">{new Date(current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold">
          {current.condition}
        </div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div>
          <div className="text-5xl sm:text-6xl font-bold tracking-tighter mb-2">{Math.round(current.temperature)}°</div>
          <div className="text-[10px] sm:text-xs font-medium space-y-1 opacity-80">
            <p className="flex items-center gap-1"><Thermometer size={12} /> {t('real_feel')} {Math.round(current.feelsLike)}°</p>
            <Link href="/details/wind" className="hover:underline flex items-center gap-1 decoration-dashed underline-offset-2 cursor-pointer"><Wind size={12} /> {t('wind')}: {current.windDirection}, {current.windSpeed} km/h</Link>
            <p className="flex items-center gap-1"><Gauge size={12} /> {t('pressure')}: {Math.round(current.pressure)} MB</p>
            <p className="flex items-center gap-1"><Droplets size={12} /> {t('humidity')}: {current.humidity}%</p>
            {current.uvIndex !== undefined && (
              <p className="flex items-center gap-1"><CloudSun size={12} /> {t('uv_index')}: {Math.round(current.uvIndex * 10) / 10}</p>
            )}
            {current.visibility !== undefined && (
              <p className="flex items-center gap-1"><Eye size={12} /> {t('visibility')}: {current.visibility >= 1000 ? `${(current.visibility / 1000).toFixed(0)} km` : `${current.visibility} m`}</p>
            )}
          </div>
        </div>
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
           <span className="text-6xl sm:text-8xl">{getWeatherIcon()}</span>
        </div>
      </div>
    </div>
  );
}
