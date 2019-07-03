import { getWeatherRepository } from '../../../test/db-helper';

import { Weather } from '../weather.model';
import { queryByDayAndCity } from './';

test('queryByDayAndCity', async () => {
  const weatherRepository = await getWeatherRepository();
  const day = new Date();
  const city = 'Berlin';

  const weathersToInclude = await weatherRepository.save([
    new Weather('Berlin', 1, 1),
    new Weather('Berlin', 2, 2),
    new Weather('Berlin', 3, 3),
  ]);

  const falseCity = new Weather('Pforzheim', 1, 1);
  const falseDate = new Weather('Berlin', 2, 2);
  falseDate.time += 1000 * 60 * 60 * 24;
  const weathersToExclude = await weatherRepository.save([
    falseCity,
    falseDate,
  ]);

  const weatherData = await queryByDayAndCity(weatherRepository, day, city);
  expect(weatherData.length).toBe(weathersToInclude.length);
  
  weathersToInclude.forEach(weatherDataToInclude => {
    expect(weatherData.find(w => weatherDataToInclude.id === w.id)).toBeDefined();
  });

  weathersToExclude.forEach(weatherToExclude => {
    expect(weatherData.find(w => weatherToExclude.id === w.id)).not.toBeDefined();
  });
});