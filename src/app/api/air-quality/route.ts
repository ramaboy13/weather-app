import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GetAirQualityUseCase } from "@/core/application";
import { OpenMeteoAirQualityRepository } from "@/infrastructure/repositories";

const aqRepository = new OpenMeteoAirQualityRepository();
const getAQUseCase = new GetAirQualityUseCase(aqRepository);

const aqSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");

  const validation = aqSchema.safeParse({ lat: latParam, lon: lonParam });

  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation Error", details: validation.error.format() },
      { status: 400 }
    );
  }

  const { lat, lon } = validation.data;

  try {
    const aq = await getAQUseCase.execute(lat, lon);
    return NextResponse.json(aq);
  } catch (error) {
    console.error("AQ API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch air quality" },
      { status: 500 }
    );
  }
}
