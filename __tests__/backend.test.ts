import { GetWeatherUseCase, SearchLocationUseCase, GetAirQualityUseCase } from "@/core/application";
import { ILocationRepository, IWeatherRepository, IAirQualityRepository, Weather, AirQuality } from "@/core/domain";
import { OpenMeteoWeatherRepository } from "@/infrastructure/repositories";

// Mock Repositories
const mockWeather: Weather = {
  current: {
    temperature: 20,
    condition: "Sunny",
    windSpeed: 10,
    windDirection: "N",
    humidity: 50,
    pressure: 1013,
    feelsLike: 22,
    isDay: true,
    time: "2023-01-01T12:00",
  },
  daily: [],
  hourly: [],
};

const mockAQ: AirQuality = {
    aqi: 50,
    pm10: 20,
    pm2_5: 10,
    description: "Good"
};

const mockWeatherRepository: IWeatherRepository = {
  getWeather: jest.fn().mockResolvedValue(mockWeather),
};

const mockLocationRepository: ILocationRepository = {
  search: jest.fn().mockResolvedValue([{ id: "1", name: "Test City", region: "TR", country: "Testland", latitude: 0, longitude: 0 }]),
};

const mockAQRepository: IAirQualityRepository = {
    getAirQuality: jest.fn().mockResolvedValue(mockAQ)
};

describe("Backend Clean Architecture", () => {
  describe("GetWeatherUseCase", () => {
    it("should return weather data from repository", async () => {
      const useCase = new GetWeatherUseCase(mockWeatherRepository);
      const result = await useCase.execute(10, 20);
      expect(mockWeatherRepository.getWeather).toHaveBeenCalledWith(10, 20);
      expect(result).toEqual(mockWeather);
    });
  });

  describe("SearchLocationUseCase", () => {
    it("should return locations from repository", async () => {
      const useCase = new SearchLocationUseCase(mockLocationRepository);
      const result = await useCase.execute("Test");
      expect(mockLocationRepository.search).toHaveBeenCalledWith("Test");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Test City");
    });
  });

  describe("GetAirQualityUseCase", () => {
      it("should return aq data", async () => {
          const useCase = new GetAirQualityUseCase(mockAQRepository);
          const result = await useCase.execute(10, 10);
          expect(mockAQRepository.getAirQuality).toHaveBeenCalledWith(10, 10);
          expect(result.aqi).toBe(50);
      });
  });

  describe("OpenMeteoWeatherRepository", () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    it("should fetch and transform data correctly", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          current: {
            temperature_2m: 15,
            weather_code: 0,
            wind_speed_10m: 5,
            wind_direction_10m: 0,
            relative_humidity_2m: 60,
            surface_pressure: 1000,
            apparent_temperature: 16,
            is_day: 1,
            time: "2023-10-10T10:00",
          },
          hourly: {
            time: [],
            temperature_2m: [],
            weather_code: [],
            precipitation_probability: [],
          },
          daily: {
            time: [],
            temperature_2m_max: [],
            temperature_2m_min: [],
            weather_code: [],
            precipitation_probability_max: [],
          },
        }),
      });

      const repo = new OpenMeteoWeatherRepository();
      const result = await repo.getWeather(10, 10);

      expect(global.fetch).toHaveBeenCalled();
      expect(result.current.temperature).toBe(15);
      expect(result.current.condition).toBe("Sunny");
    });
  });
});
