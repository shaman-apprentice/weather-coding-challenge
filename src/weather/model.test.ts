import { getWeatherRepository } from '../../test/db-helper';

import { model } from './model';

let weatherModel : any;

beforeEach(async () => {
  weatherModel = model(await getWeatherRepository());
})

test('getWeatherOfDay works with no value in the db', async () => {
  const weatherOfDay = await weatherModel.getWeatherOfDay(new Date(), 'Berlin');
  expect(weatherOfDay.temp).toBe(0);
  expect(weatherOfDay.humidity).toBe(0);
});