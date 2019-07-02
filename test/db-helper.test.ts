import { Weather } from '../src/weather/weather.model';
import { getWeatherRepository } from './db-helper';

test('saving an entry to the db does work', async () => {
  const weatherRepository = await getWeatherRepository();
  const savedEntity = await weatherRepository.save(new Weather('Berlin', 1, 2));

  expect(savedEntity).toBeDefined;
  expect(savedEntity.id).toBeDefined;
})

test('each getWeatherRepository returns a clean weather repository', async () => {
  const weatherRepository = await getWeatherRepository();
  await weatherRepository.save(new Weather('Berlin', 1, 2));
  const weatherEntries = await weatherRepository.find();
  expect(weatherEntries.length).toBe(1);

  const otherWeatherRepository = await getWeatherRepository();
  const otherWeatherEntries = await otherWeatherRepository.find();
  expect(otherWeatherEntries.length).toBe(0);
})