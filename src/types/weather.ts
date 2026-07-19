export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current?: CurrentWeather;
  current_weather?: CurrentWeatherLegacy;
  hourly?: HourlyData;
  daily?: DailyData;
}

export interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  surface_pressure: number;
  uv_index?: number;
  visibility?: number;
  dew_point_2m?: number;
  cloud_cover?: number;
  time: string;
}

export interface CurrentWeatherLegacy {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  weather_code?: number[];
  weathercode?: number[];
  precipitation_probability?: number[];
  relative_humidity_2m?: number[];
  wind_speed_10m?: number[];
  visibility?: number[];
  cloud_cover?: number[];
  is_day?: number[];
}

export interface DailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  sunrise?: string[];
  sunset?: string[];
  uv_index_max?: number[];
}
