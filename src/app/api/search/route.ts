import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SearchLocationUseCase } from "@/core/application";
import { MockLocationRepository } from "@/infrastructure/repositories";

const locationRepository = new MockLocationRepository();
const searchLocationUseCase = new SearchLocationUseCase(locationRepository);

const searchSchema = z.object({
  q: z.string().min(1, "Search query must be at least 1 character"),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const qParam = searchParams.get("q");

  const validation = searchSchema.safeParse({ q: qParam });

  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation Error", details: validation.error.format() },
      { status: 400 }
    );
  }

  const { q } = validation.data;

  try {
    const locations = await searchLocationUseCase.execute(q);
    return NextResponse.json(locations);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to search locations" },
      { status: 500 }
    );
  }
}
