import http from 'http';

import { Config as IServerConfig, startServer } from '../../src/server';
import { options as ormOptions } from '../test-orm-config';
import { EventEmitter } from 'events';

jest.mock('http', () => {
  const origModule = jest.requireActual('http');

  const { fstResult, sndResult } = require('./mock-open-weather-result')
  const mockedWeatherResponses = [ fstResult, sndResult ];

  return {
    ...origModule,
    get: (url: string, cb: Function) => {
      if (url.startsWith('http://api.openweathermap.org')) {
        const mockedResponse = new EventEmitter();
        cb(mockedResponse);
        const mockedData = mockedWeatherResponses.shift();
        mockedResponse.emit('data', JSON.stringify(mockedData));
        mockedResponse.emit('end');
        return { on: () => undefined };
      }
      
      return origModule.get(url, cb);
    },
  }
});

jest.useFakeTimers();

let server: http.Server;
const config: IServerConfig = {
  port: 8081,
  cities: [ 'Berlin' ] as const,
  poll_interval: 1000 * 60 * 60, // note the call to `jest.useFakeTimers()` above
  openWeatherAPIKey: 'openWeatherAPIKey',
  connectionOptions: ormOptions,
};

beforeAll(async () => {
  server = await startServer(config);
});

afterAll(async () => {
  await closeServer(server);
  jest.clearAllTimers();
  jest.restoreAllMocks();
})


test('full integration test', async () => {
  // trigger the setInterval of server, which gets weather data from http://api.openweathermap.org
  // (they are mocked above on mocked http.get)
  jest.advanceTimersByTime(config.poll_interval);
  jest.advanceTimersByTime(config.poll_interval);
  
  const weather: any = await getWeather(`http://localhost:${config.port}/weather?city=Berlin&month=2019-07`);
  expect(weather.temp).toBe(293.905);
  expect(weather.humidity).toBe(62);

  await expectBadRequest(`http://localhost:${config.port}/weather?month=2019-07`);
  await expectBadRequest(`http://localhost:${config.port}/weather?city=Berlin&month=201-07`);
});

async function getWeather(url: string) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      let data = '';
        
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        if (data === 'Bad request')
          reject(data);
        else
          resolve(JSON.parse(data));
      });

    }).on('error', reject);
  });
}

async function expectBadRequest(url: string) {
  let noCityError;
  try {
    await getWeather(url);
  } 
  catch (error) {
    noCityError = error;
  }
  expect(noCityError).toBe('Bad request');
}

function closeServer(server: http.Server) {
  return new Promise((resolve) => {
    server.close(resolve);
  });
}