import { ILocationRepository, IWeatherRepository, IAirQualityRepository, Location, Weather, AirQuality } from "../domain";

export class GetWeatherUseCase {
  constructor(private weatherRepository: IWeatherRepository) {}

  async execute(latitude: number, longitude: number): Promise<Weather> {
    return this.weatherRepository.getWeather(latitude, longitude);
  }
}

export class SearchLocationUseCase {
  constructor(private locationRepository: ILocationRepository) {}

  async execute(query: string): Promise<Location[]> {
    return this.locationRepository.search(query);
  }
}

export class GetAirQualityUseCase {
    constructor(private aqRepository: IAirQualityRepository) {}

    async execute(latitude: number, longitude: number): Promise<AirQuality> {
        return this.aqRepository.getAirQuality(latitude, longitude);
    }
}
