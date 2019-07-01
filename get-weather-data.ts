import http from 'http';
import { IWeatherResponse } from './weather/weather.model';
import { openWeatherAPIKey } from './open-weather-api-key';

export function getWeatherData(city: string) : Promise<IWeatherResponse> {
  return new Promise((resolve, reject) => {
    http.get(buildRequestUrl(city), (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        const result = JSON.parse(data);
        resolve(new WeatherResponse(result.main.temp, result.main.humidity));
      });

    }).on('error', reject);
  });
}

class WeatherResponse implements IWeatherResponse {
  temp: number;
  humidity: number;

  constructor(temp : number, humidity: number) {
    this.temp = temp;
    this.humidity = humidity;
  }
};

function buildRequestUrl(city: string) : string {
  return `http://api.openweathermap.org/data/2.5/weather?q=${city},DE&&appid=${openWeatherAPIKey}`;
}

const exampleResponse = {
  "coord": {
    "lon": 13.39,
    "lat": 52.52
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 293.81,
    "pressure": 1024,
    "humidity": 63,
    "temp_min": 290.37,
    "temp_max": 297.04
  },
  "visibility": 10000,
  "wind": {
    "speed": 4.1,
    "deg": 280
  },
  "clouds": {
    "all": 75
  },
  "dt": 1561713968,
  "sys": {
    "type": 1,
    "id": 1275,
    "message": 0.01,
    "country": "DE",
    "sunrise": 1561689936,
    "sunset": 1561750404
  },
  "timezone": 7200,
  "id": 2950159,
  "name": "Berlin",
  "cod": 200
}