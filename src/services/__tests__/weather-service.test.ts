import { WeatherService } from '../weather-service';
import httpClient from '@/lib/axios';

// Mock the axios module
jest.mock('@/lib/axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    interceptors: {
      response: { use: jest.fn() }
    }
  },
}));

describe('WeatherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch weather data successfully', async () => {
    const mockData = {
      latitude: 52.52,
      longitude: 13.419998,
      current_weather: {
        temperature: 15.0,
        weathercode: 0,
        windspeed: 10.0,
        winddirection: 180,
        is_day: 1,
        time: "2023-01-01T00:00"
      }
    };

    (httpClient.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await WeatherService.getForecast(52.52, 13.419998);

    expect(result).toEqual(mockData);
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('api.open-meteo.com'), expect.objectContaining({
      params: {
        latitude: 52.52,
        longitude: 13.419998,
        current_weather: true,
      }
    }));
  });

  it('should throw an error when API call fails', async () => {
    (httpClient.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await expect(WeatherService.getForecast(52.52, 13.419998)).rejects.toThrow('Failed to fetch weather data');
  });
});
