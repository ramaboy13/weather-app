import {
  DailyForecast,
  HourlyForecast,
  ILocationRepository,
  IWeatherRepository,
  Location,
  Weather,
} from "../core/domain";

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
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure",
      hourly: "temperature_2m,weather_code,precipitation_probability",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      timezone: "auto",
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }

    const data = await response.json();

    const current = data.current;
    const hourly = data.hourly;
    const daily = data.daily;

    const weather: Weather = {
      current: {
        temperature: current.temperature_2m,
        condition: mapWeatherCode(current.weather_code),
        windSpeed: current.wind_speed_10m,
        windDirection: this.getWindDirection(current.wind_direction_10m),
        humidity: current.relative_humidity_2m,
        pressure: current.surface_pressure,
        feelsLike: current.apparent_temperature,
        isDay: current.is_day === 1,
        time: current.time,
      },
      daily: daily.time.map((time: string, index: number) => ({
        date: time,
        maxTemp: daily.temperature_2m_max[index],
        minTemp: daily.temperature_2m_min[index],
        condition: mapWeatherCode(daily.weather_code[index]),
        rainChance: daily.precipitation_probability_max[index],
      })).slice(0, 7), // Next 7 days
      hourly: hourly.time.map((time: string, index: number) => ({
        time: time,
        temperature: hourly.temperature_2m[index],
        condition: mapWeatherCode(hourly.weather_code[index]),
        rainChance: hourly.precipitation_probability[index],
      })).slice(0, 24), // Next 24 hours
    };

    return weather;
  }

  private getWindDirection(degrees: number): string {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }
}

export class MockLocationRepository implements ILocationRepository {
  private locations: Location[] = [
    { id: "1", name: "Seattle", region: "WA", country: "USA", latitude: 47.6062, longitude: -122.3321 },
    { id: "2", name: "Sydney", region: "NSW", country: "Australia", latitude: -33.8688, longitude: 151.2093 },
    { id: "3", name: "London", region: "", country: "UK", latitude: 51.5074, longitude: -0.1278 },
    { id: "4", name: "New York", region: "NY", country: "USA", latitude: 40.7128, longitude: -74.0060 },
    { id: "5", name: "Tokyo", region: "", country: "Japan", latitude: 35.6762, longitude: 139.6503 },
    { id: "6", name: "Singapore", region: "", country: "Singapore", latitude: 1.3521, longitude: 103.8198 },
    { id: "7", name: "Jakarta", region: "DKI", country: "Indonesia", latitude: -6.2088, longitude: 106.8456 },
    { id: "8", name: "California", region: "CA", country: "USA", latitude: 36.7783, longitude: -119.4179 },
    { id: "9", name: "Beijing", region: "", country: "China", latitude: 39.9042, longitude: 116.4074 },
    { id: "10", name: "Jerusalem", region: "", country: "Israel", latitude: 31.7683, longitude: 35.2137 },
  ];

  async search(query: string): Promise<Location[]> {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return this.locations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(lowerQuery) ||
        loc.country.toLowerCase().includes(lowerQuery)
    );
  }
}
