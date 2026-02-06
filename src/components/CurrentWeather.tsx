import { Weather } from "@/core/domain";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CurrentWeatherProps {
  weather: Weather;
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  const { current } = weather;

  return (
    <div className="bg-[#B2DAFF] text-gray-900 rounded-[2rem] p-6 mb-6 relative overflow-hidden shadow-lg shadow-blue-500/20 group hover:shadow-blue-500/30 transition-shadow">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h3 className="font-semibold text-lg">Today</h3>
          <p className="text-sm opacity-70">{new Date(current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
          {current.condition}
        </div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div>
          <div className="text-6xl font-bold tracking-tighter mb-2">{Math.round(current.temperature)}°</div>
          <div className="text-xs font-medium space-y-1 opacity-80">
            <p>Real Feel {Math.round(current.feelsLike)}°</p>
            <Link href="/details/wind" className="hover:underline block decoration-dashed underline-offset-2">Wind: {current.windDirection}, {current.windSpeed} km/h</Link>
            <p>Pressure: {current.pressure}MB</p>
            <p>Humidity: {current.humidity}%</p>
          </div>
        </div>
        <div className="relative w-32 h-32 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
           <img
             src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbUMzUBFbeN_1UoDh6ObmmJR5ltnGKAYARS-2h1_Eo_GtW9WzkKu_WP7x0jnugnZ5BS_xhkC1ydjzJm5cVHScfnhN1OvtRX5zIffCy2ZTBM7UPZJmxMgYoKTd3dwCTPdL0Av-F3gDYsYDB9bztlBcyru9sr2AJGMVdRGD1XZdkZs3nxhkNxLBLSJG4RilInnJik8g0Ybt6Rsw8yHycXx_17PmtqJhXnJq_6eO3Ssv5_jbfYPI0tV6vCHHntNm8GxWrs5PiewRAVU_v"
             alt="Weather Icon"
             className="w-full h-full object-contain drop-shadow-xl"
           />
        </div>
      </div>
    </div>
  );
}
