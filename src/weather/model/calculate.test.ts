import { Weather } from '../weather.model';
import { calcAvg } from './';

test('calcAvg with empty list', () => {
  const weatherOfDay = calcAvg([]);
  expect(weatherOfDay.temp).toBe(undefined);
  expect(weatherOfDay.humidity).toBe(undefined);
});

test('calcAvg with one entry', () => {
  const weatherOfDay = calcAvg([
    new Weather('Berlin', 1, 2),
  ]);
  expect(weatherOfDay.temp).toBe(1);
  expect(weatherOfDay.humidity).toBe(2);
});

test('calcAvg with multiple entries', () => {
  const weatherOfDay = calcAvg([
    new Weather('Berlin', 1, 2),
    new Weather('Berlin', 50, 52),
    new Weather('Berlin', 72, 75),
  ]);
  expect(weatherOfDay.temp).toBe(41);
  expect(weatherOfDay.humidity).toBe(43);
});