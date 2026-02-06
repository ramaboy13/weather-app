import { Location, Weather } from "./entities";

export interface IWeatherRepository {
  getWeather(latitude: number, longitude: number): Promise<Weather>;
}

export interface ILocationRepository {
  search(query: string): Promise<Location[]>;
}
