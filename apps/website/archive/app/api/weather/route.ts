// /app/api/weather/route.ts
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

interface WeatherResponse {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    wind_direction: string;
    description: string;
    icon: string;
  };
  forecast: {
    date: string;
    temp_min: number;
    temp_max: number;
    description: string;
    precipitation_chance: number;
  }[];
  meta: {
    updated_at: string;
    client_ip: string;
    client_location: string;
  };
}

const WEATHER_CODES = new Map([
  [0, { description: 'Clear sky', icon: '01d' }],
  [1, { description: 'Mainly clear', icon: '02d' }],
  [2, { description: 'Partly cloudy', icon: '03d' }],
  [3, { description: 'Overcast', icon: '04d' }],
  [45, { description: 'Foggy', icon: '50d' }],
  [51, { description: 'Light drizzle', icon: '09d' }],
  [61, { description: 'Light rain', icon: '10d' }],
  [63, { description: 'Moderate rain', icon: '10d' }],
  [65, { description: 'Heavy rain', icon: '10d' }],
  [71, { description: 'Light snow', icon: '13d' }],
  [95, { description: 'Thunderstorm', icon: '11d' }],
]);

function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
}

async function getCityCoordinates(city: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.results?.[0]) {
      throw new Error(`City "${city}" not found`);
    }

    return data.results[0];
  } catch (error) {
    console.error('Error fetching city data:', error);
    throw new Error('Failed to get city coordinates');
  }
}

async function getWeatherData(lat: number, lon: number, timezone: string) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.append('latitude', lat.toString());
  url.searchParams.append('longitude', lon.toString());
  url.searchParams.append('timezone', timezone);
  url.searchParams.append(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,wind_direction_10m,weather_code'
  );
  url.searchParams.append(
    'daily',
    'temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max'
  );

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get headers
    const headersList = await headers();
    const clientIp = headersList.get('x-forwarded-for') || 'localhost';
    const clientLocation = headersList.get('x-vercel-ip-country') || 'LOCAL';

    const city = request.nextUrl.searchParams.get('city');
    if (!city) {
      return Response.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    let cityData, weatherData;

    cityData = await getCityCoordinates(city);
    weatherData = await getWeatherData(
      cityData.latitude,
      cityData.longitude,
      cityData.timezone || 'UTC'
    );

    // Format response
    const response: WeatherResponse = {
      location: {
        name: cityData.name,
        country: cityData.country_code,
        lat: cityData.latitude,
        lon: cityData.longitude,
      },
      current: {
        temp: Math.round(weatherData.current.temperature_2m),
        feels_like: Math.round(weatherData.current.apparent_temperature),
        humidity: Math.round(weatherData.current.relative_humidity_2m),
        pressure: Math.round(weatherData.current.pressure_msl),
        wind_speed: Math.round(weatherData.current.wind_speed_10m),
        wind_direction: getWindDirection(
          weatherData.current.wind_direction_10m
        ),
        description:
          WEATHER_CODES.get(weatherData.current.weather_code)?.description ||
          'Unknown',
        icon:
          WEATHER_CODES.get(weatherData.current.weather_code)?.icon || '01d',
      },
      forecast: weatherData.daily.time.map((date: string, i: number) => ({
        date,
        temp_min: Math.round(weatherData.daily.temperature_2m_min[i]),
        temp_max: Math.round(weatherData.daily.temperature_2m_max[i]),
        description:
          WEATHER_CODES.get(weatherData.daily.weather_code[i])?.description ||
          'Unknown',
        precipitation_chance:
          weatherData.daily.precipitation_probability_max[i],
      })),
      meta: {
        updated_at: new Date().toISOString(),
        client_ip: clientIp,
        client_location: clientLocation,
      },
    };

    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'X-Client-Ip': clientIp,
        'X-Client-Location': clientLocation,
      },
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch weather data',
      },
      {
        status:
          error instanceof Error && error.message.includes('not found')
            ? 404
            : 500,
      }
    );
  }
}
