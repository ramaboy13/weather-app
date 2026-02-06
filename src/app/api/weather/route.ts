import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GetWeatherUseCase, GetAirQualityUseCase } from "@/core/application";
import { OpenMeteoWeatherRepository, OpenMeteoAirQualityRepository } from "@/infrastructure/repositories";

const weatherRepository = new OpenMeteoWeatherRepository();
const aqRepository = new OpenMeteoAirQualityRepository();
const getWeatherUseCase = new GetWeatherUseCase(weatherRepository);
const getAQUseCase = new GetAirQualityUseCase(aqRepository);

const weatherSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");

  const validation = weatherSchema.safeParse({ lat: latParam, lon: lonParam });

  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation Error", details: validation.error.format() },
      { status: 400 }
    );
  }

  const { lat, lon } = validation.data;

  try {
    const [weather, aq] = await Promise.all([
        getWeatherUseCase.execute(lat, lon),
        getAQUseCase.execute(lat, lon).catch(() => undefined) // Optional AQ
    ]);

    if (aq) {
        weather.airQuality = aq;
    }

    return NextResponse.json(weather);
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
