import { useEffect, useState } from 'react';
// apps/weather/WeatherCommand.tsx
import { HiCloud } from 'react-icons/hi2';
import type { CommandGroup } from '../types';

export const useWeatherCommand = (): CommandGroup => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [userLocation, setUserLocation] = useState('Berlin');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Location fetch failed');
        const data = await response.json();
        if (data.city) {
          setUserLocation(data.city);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`/api/weather?city=${userLocation}`);
        if (!response.ok) throw new Error('Weather fetch failed');
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeatherData(null);
      }
    };
    fetchWeather();
  }, [userLocation]);

  return {
    name: 'Weather',
    commands: [
      {
        id: 'weather',
        name: 'Current weather',
        description:
          weatherData && weatherData.current
            ? `${userLocation}: ${Math.round(weatherData.current.temp)}°C, ${weatherData.current.description}`
            : 'Loading weather...',
        icon: HiCloud,
        action: async () => {
          if (weatherData && weatherData.main && weatherData.weather) {
            await navigator.clipboard.writeText(
              `Current weather in ${userLocation}: ${Math.round(weatherData.main.temp)}°C, ${weatherData.current.description}`
            );
          }
        },
      },
    ],
  };
};
