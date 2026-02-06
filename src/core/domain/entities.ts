export interface Weather {
  current: {
    temperature: number;
    condition: string; // e.g., "Sunny", "Cloudy"
    windSpeed: number;
    windDirection: string;
    humidity: number;
    pressure: number;
    feelsLike: number;
    uvIndex?: number;
    isDay: boolean;
    time: string;
  };
  daily: DailyForecast[];
  hourly: HourlyForecast[];
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  rainChance: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  rainChance: number;
}

export interface Location {
  id: string;
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
}
