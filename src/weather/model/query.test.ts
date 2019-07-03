import { getWeatherRepository } from '../../../test/db-helper';

import { Weather } from '../weather.model';
import { queryByDayAndCity, queryByMonthAndCity } from './';

test('queryByDayAndCity', async () => {
  const weatherRepository = await getWeatherRepository();
  const city = 'Berlin';
  const year = 2019;
  const month = 4;
  const day = 18;
  const date = new Date(year, month, day);

  const weathersToInclude = await weatherRepository.save([
    createWeather(city, 1, 1, date),
    createWeather(city, 2, 2, date),
    createWeather(city, 3, 3, date),
  ]);

  const weathersToExclude = await weatherRepository.save([
    createWeather('Pforzheim', 1, 1, date),
    createWeather(city, 4, 4, new Date(year, month, day + 1)),
    createWeather(city, 5, 5, new Date(year, month, day - 1)),
  ]);

  const weatherData = await queryByDayAndCity(weatherRepository, date, city);
  expect(weatherData.length).toBe(weathersToInclude.length);
  
  weathersToInclude.forEach(weatherDataToInclude => {
    expect(weatherData.find(w => weatherDataToInclude.id === w.id)).toBeDefined();
  });

  weathersToExclude.forEach(weatherToExclude => {
    expect(weatherData.find(w => weatherToExclude.id === w.id)).not.toBeDefined();
  });
});

test('queryByDayAndCity', async () => {
  const weatherRepository = await getWeatherRepository();
  const city = 'Berlin';
  const year = 2019;
  const month = 4;
  const date = new Date(year, month);

  const weathersToInclude = await weatherRepository.save([
    createWeather(city, 1, 2, date),
    createWeather(city, 3, 4, new Date(year, month, 1)),
    createWeather(city, 5, 6, new Date(year, month, 31)),
  ]);

  const weathersToExclude = await weatherRepository.save([
    createWeather('Pforzheim', 7, 8, date),
    createWeather(city, 9, 10, new Date(year + 1, month, 1)),
    createWeather(city, 11, 12, new Date(year - 1, month, 1)),
    createWeather(city, 13, 14, new Date(year, month + 1, 1)),
    createWeather(city, 15, 16, new Date(year, month - 1, 1)),
  ]);

  const weatherData = await queryByMonthAndCity(weatherRepository, date, city);
  expect(weatherData.length).toBe(weathersToInclude.length);
  
  weathersToInclude.forEach(weatherDataToInclude => {
    expect(weatherData.find(w => weatherDataToInclude.id === w.id)).toBeDefined();
  });

  weathersToExclude.forEach(weatherToExclude => {
    expect(weatherData.find(w => weatherToExclude.id === w.id)).not.toBeDefined();
  });
});

function createWeather(city: string, temp: number, humidity:number, date: Date) {
  const weather = new Weather(city, temp, humidity);
  weather.time = date.getTime();
  return weather;
}