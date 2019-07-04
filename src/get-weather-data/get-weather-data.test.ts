import http from 'http';
jest.mock('http');

import { buildGetWeatherData } from './';

test('the correct url is build', () => {
  const httpGetMock = http.get as jest.Mock;
  httpGetMock.mockImplementationOnce(() => ({
    on: () => undefined,
  }));

  const getWeatherData = buildGetWeatherData('api_key');
  getWeatherData('Berlin');

  expect(httpGetMock).toHaveBeenCalledTimes(1);
  expect(httpGetMock.mock.calls[0][0]).toBe('http://api.openweathermap.org/data/2.5/weather?q=Berlin,DE&&appid=api_key');
});
