import { Location, Weather, AirQuality } from "./entities";

export interface IWeatherRepository {
  getWeather(latitude: number, longitude: number): Promise<Weather>;
}

export interface ILocationRepository {
  search(query: string): Promise<Location[]>;
}

export interface IAirQualityRepository {
  getAirQuality(latitude: number, longitude: number): Promise<AirQuality>;
}
