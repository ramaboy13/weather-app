import httpClient from '@/lib/axios';
import { WeatherResponse } from '@/types/weather';

export class WeatherService {
  private static baseUrl = process.env.API_WEATHER_URL || 'https://api.open-meteo.com/v1/forecast';

  static async getForecast(lat: number, lon: number): Promise<WeatherResponse> {
    try {
      const response = await httpClient.get<WeatherResponse>(this.baseUrl, {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }
}
