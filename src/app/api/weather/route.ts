import { NextResponse } from 'next/server';
import { WeatherService } from '@/services/weather-service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and Longitude are required' },
      { status: 400 }
    );
  }

  try {
    const data = await WeatherService.getForecast(parseFloat(lat), parseFloat(lon));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
