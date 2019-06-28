import { Repository } from 'typeorm';
import { Weather } from './weather.model';

export const model = (weatherRepository: Repository<Weather>) => ({
  getWeatherOfDay(day: Date, city: string) {},
  getWeatherOfMonth(month: Date, city: string) {},
});
