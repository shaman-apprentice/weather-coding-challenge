import { Repository } from 'typeorm';
import { Weather } from './weather.model';

export const model = (weatherRepository: Repository<Weather>) => ({
  async getWeatherOfDay(day: Date, city: string) {
    return {
      temp: 0,
      humidity: 0,
    };
  },
  getWeatherOfMonth(month: Date, city: string) {},
});
