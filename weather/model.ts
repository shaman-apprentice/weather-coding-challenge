import { Repository, Between } from 'typeorm';
import { Weather } from './weather.model';

export const model = (weatherRepository: Repository<Weather>) => ({
  async getWeatherOfDay(day: Date, city: string) {
    const weatherData = await getRawWeatherOfDay(weatherRepository, day, city);
    return calcAvg(weatherData);
  },
  getWeatherOfMonth(month: Date, city: string) {
    // to be implemented
  },
});

async function getRawWeatherOfDay(weatherRepository: Repository<Weather>, day: Date, city: string) {
  const startOfDay = (new Date(day)).setHours(0, 0, 0, 0);
  const endOfDay = (new Date(startOfDay)).setHours(23, 59, 59, 999);
  return await weatherRepository.find({
    select: ['temp', 'humidity'],
    where: {
      city,
      time: Between(startOfDay, endOfDay),
    }
  });
}

function calcAvg(weatherData : Weather[]) {
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