import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GetWeatherUseCase } from "@/core/application";
import { OpenMeteoWeatherRepository } from "@/infrastructure/repositories";

const weatherRepository = new OpenMeteoWeatherRepository();
const getWeatherUseCase = new GetWeatherUseCase(weatherRepository);

const weatherSchema = z.object({
  lat: z.coerce
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  lon: z.coerce
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
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
    const weather = await getWeatherUseCase.execute(lat, lon);
    return NextResponse.json(weather);
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
