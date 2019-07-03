import { Repository, Between } from 'typeorm';
import { Weather, WeatherResponse } from '../weather.model';

export const model = (weatherRepository: Repository<Weather>) => ({
  async getWeatherOfDay(day: Date, city: string) {
    const weatherData = await queryByDayAndCity(weatherRepository, day, city);
    return calcAvg(weatherData);
  },
  getWeatherOfMonth(month: Date, city: string) {},
});

export function queryByDayAndCity(weatherRepository: Repository<Weather>, day: Date, city: string): Promise<Weather[]> {
  const startOfDay = (new Date(day)).setHours(0, 0, 0, 0);
  const endOfDay = (new Date(startOfDay)).setHours(23, 59, 59, 999);

  return weatherRepository.find({
    where: {
      city,
      time: Between(startOfDay, endOfDay),
    }
  });
}

export function calcAvg(weatherData : Weather[]): WeatherResponse {
  if (weatherData.length === 0)
    return { temp: undefined, humidity: undefined };

  const sum = weatherData.reduce((acc, weather) => {
    acc.temp += weather.temp;
    acc.humidity += weather.humidity;
    return acc;
  }, { temp: 0, humidity: 0 });

  return {
    temp: sum.temp / weatherData.length,
    humidity: sum.humidity / weatherData.length,
  };
}