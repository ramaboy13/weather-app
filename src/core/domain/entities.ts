export interface Weather {
  current: {
    temperature: number;
    condition: string;
    windSpeed: number;
    windDirection: string;
    humidity: number;
    pressure: number;
    feelsLike: number;
    uvIndex?: number;
    visibility?: number;
    dewPoint?: number;
    cloudCover?: number;
    isDay: boolean;
    time: string;
  };
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  airQuality?: AirQuality;
  astronomy?: Astronomy;
}

export interface AirQuality {
  aqi: number;
  pm10: number;
  pm2_5: number;
  description: string;
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  rainChance: number;
  sunrise?: string;
  sunset?: string;
  uvIndexMax?: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  rainChance: number;
  humidity?: number;
  windSpeed?: number;
  visibility?: number;
  cloudCover?: number;
}

export interface Location {
  id: string;
  name: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Astronomy {
  sunrise: string;
  sunset: string;
  moonrise?: string;
  moonset?: string;
  moonPhase?: string;
}
