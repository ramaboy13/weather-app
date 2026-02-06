import { ILocationRepository, IWeatherRepository, Location, Weather } from "../domain";

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
