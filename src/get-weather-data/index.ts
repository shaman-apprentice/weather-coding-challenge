import http from 'http';

import { WeatherResponse } from "../weather/weather.model";

export function buildGetWeatherData(openWeatherAPIKey: string) {
  return (city: string): Promise<WeatherResponse> => {
    return new Promise((resolve, reject) => {
      http.get(buildRequestUrl(openWeatherAPIKey, city), (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          resolve(JSON.parse(data));
        });
  
      }).on('error', reject);
    });
  }
}

function buildRequestUrl(openWeatherAPIKey:string, city: string): string {
  return `http://api.openweathermap.org/data/2.5/weather?q=${city},DE&&appid=${openWeatherAPIKey}`;
}