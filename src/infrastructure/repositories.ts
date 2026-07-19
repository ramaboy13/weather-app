import {
  AirQuality,
  Astronomy,
  DailyForecast,
  HourlyForecast,
  IAirQualityRepository,
  ILocationRepository,
  IWeatherRepository,
  Location,
  Weather,
} from "../core/domain";
import { API_URL_1, API_URL_2, API_URL_3 } from "@/lib/constants";

// WMO Weather Code Mapper
function mapWeatherCode(code: number): string {
  if (code === 0) return "Sunny";
  if (code === 1 || code === 2 || code === 3) return "Partly Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 77) return "Snowy";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code >= 95 && code <= 99) return "Thunderstorm";
  return "Unknown";
}

export class OpenMeteoWeatherRepository implements IWeatherRepository {
  async getWeather(latitude: number, longitude: number): Promise<Weather> {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index,visibility,dew_point_2m,cloud_cover",
      hourly: "temperature_2m,weather_code,precipitation_probability,relative_humidity_2m,wind_speed_10m,visibility,cloud_cover,is_day",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max",
      timezone: "auto",
    });

    const response = await fetch(`${API_URL_1}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const data = await response.json();

    const current = data.current;
    const hourly = data.hourly;
    const daily = data.daily;

    const astronomy: Astronomy | undefined =
      daily.sunrise?.[0] && daily.sunset?.[0]
        ? { sunrise: daily.sunrise[0], sunset: daily.sunset[0] }
        : undefined;

    const weather: Weather = {
      current: {
        temperature: current.temperature_2m,
        condition: mapWeatherCode(current.weather_code),
        windSpeed: current.wind_speed_10m,
        windDirection: this.getWindDirection(current.wind_direction_10m),
        humidity: current.relative_humidity_2m,
        pressure: current.surface_pressure,
        feelsLike: current.apparent_temperature,
        uvIndex: current.uv_index,
        visibility: current.visibility,
        dewPoint: current.dew_point_2m,
        cloudCover: current.cloud_cover,
        isDay: current.is_day === 1,
        time: current.time,
      },
      daily: daily.time.map((time: string, index: number) => ({
        date: time,
        maxTemp: daily.temperature_2m_max[index],
        minTemp: daily.temperature_2m_min[index],
        condition: mapWeatherCode(daily.weather_code[index]),
        rainChance: daily.precipitation_probability_max[index],
        sunrise: daily.sunrise?.[index],
        sunset: daily.sunset?.[index],
        uvIndexMax: daily.uv_index_max?.[index],
      })).slice(0, 7),
      hourly: hourly.time.map((time: string, index: number) => ({
        time: time,
        temperature: hourly.temperature_2m[index],
        condition: mapWeatherCode(hourly.weather_code[index]),
        rainChance: hourly.precipitation_probability[index],
        humidity: hourly.relative_humidity_2m?.[index],
        windSpeed: hourly.wind_speed_10m?.[index],
        visibility: hourly.visibility?.[index],
        cloudCover: hourly.cloud_cover?.[index],
      })).slice(0, 48),
      astronomy,
    };

    return weather;
  }

  private getWindDirection(degrees: number): string {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }
}

export class OpenMeteoGeocodingRepository implements ILocationRepository {
  async search(query: string): Promise<Location[]> {
    const params = new URLSearchParams({
      name: query,
      count: "10",
      language: "en",
      format: "json",
    });

    const response = await fetch(`${API_URL_2}?${params.toString()}`);

    if (!response.ok) {
       // Fallback to empty if fails
       console.error("Geocoding API failed");
       return [];
    }

    const data = await response.json();
    if (!data.results) return [];

    return data.results.map((item: any) => ({
      id: item.id.toString(),
      name: item.name,
      region: item.admin1 || "",
      country: item.country,
      latitude: item.latitude,
      longitude: item.longitude,
    }));
  }
}

export class OpenMeteoAirQualityRepository implements IAirQualityRepository {
    async getAirQuality(latitude: number, longitude: number): Promise<AirQuality> {
        const params = new URLSearchParams({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            current: "us_aqi,pm10,pm2_5",
            timezone: "auto"
        });

        const response = await fetch(`${API_URL_3}?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch AQI");

        const data = await response.json();
        const current = data.current;

        let description = "Good";
        if (current.us_aqi > 50) description = "Moderate";
        if (current.us_aqi > 100) description = "Unhealthy for Sensitive Groups";
        if (current.us_aqi > 150) description = "Unhealthy";
        if (current.us_aqi > 200) description = "Very Unhealthy";
        if (current.us_aqi > 300) description = "Hazardous";

        return {
            aqi: current.us_aqi,
            pm10: current.pm10,
            pm2_5: current.pm2_5,
            description
        };
    }
}
