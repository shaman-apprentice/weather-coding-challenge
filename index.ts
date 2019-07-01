import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import express from 'express';

import { Weather } from './weather/weather.model';
import { router as weatherRouter } from './weather';
import { getWeatherData } from './get-weather-data';

(async function main() {
  const options: ConnectionOptions = {
    type: 'sqlite',
    database: './db/db.sqlite3',
    entities: [Weather],
    logging: true,
  };
  const connection = await createConnection(options);
  const weatherRepository = connection.getRepository(Weather);

  const weatherData = await getWeatherData('Berlin');
  const weather = new Weather('Berlin', weatherData.temp, weatherData.humidity);
  await weatherRepository.save(weather);

  setInterval(async () => {
    const weatherData = await getWeatherData('Berlin');
    const weather = new Weather('Berlin', weatherData.temp, weatherData.humidity);
    await weatherRepository.save(weather);
  }, 1000 * 60 * 10); // 10 min interval for testing, as the weather data is supposed to be updated each 10 mins on api.openweathermap.org

  const app: express.Application = express();

  app.use('/weather', weatherRouter(weatherRepository));

  app.listen(8080, () =>
    console.log('Server is listening to http://localhost:8080'),
  );
})();
