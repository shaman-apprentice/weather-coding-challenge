import 'reflect-metadata';
import express from 'express';
import http from 'http';
import { ConnectionOptions, createConnection } from 'typeorm';

import { router as weatherRouter } from './weather';
import { Weather } from './weather/weather.model';
import { buildGetWeatherData } from './get-weather-data';

export async function startServer(config: Config): Promise<http.Server> {
  const connection = await createConnection(config.connectionOptions);
  const weatherRepository = connection.getRepository(Weather);
  const getWeatherData = buildGetWeatherData(config.openWeatherAPIKey);

  const getWeatherDataInterval = setInterval(async () => {
    const weatherData = await Promise.all(config.cities.map(getWeatherData));

    await weatherRepository.save(weatherData.map((data, i) =>
      new Weather(config.cities[i], data.main.temp, data.main.humidity)
    ));

  }, config.poll_interval);

  const app = express();
  app.use('/weather', weatherRouter(weatherRepository));

  return new Promise(resolve => {
    const server = app.listen(config.port || 8080, () => {
      server.on('close', () => clearInterval(getWeatherDataInterval));
      resolve(server);
    });
  });
}

export interface Config {
  readonly cities: readonly string[];
  readonly openWeatherAPIKey: string;
  readonly poll_interval: number;
  readonly connectionOptions: ConnectionOptions;
  readonly port: number;
}