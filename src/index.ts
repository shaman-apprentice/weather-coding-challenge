import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import express from 'express';

import { Weather } from './weather/weather.model';
import { router as weatherRouter } from './weather';

(async function main() {
  const options: ConnectionOptions = {
    type: 'sqlite',
    database: './db/db.sqlite3',
    entities: [Weather],
    logging: true,
  };
  const connection = await createConnection(options);
  const weatherRepository = connection.getRepository(Weather);

  setInterval(async () => {
    // get and save weather data
  }, 1000 * 60 * 60);

  const app: express.Application = express();

  app.use('/weather', weatherRouter(weatherRepository));

  app.listen(8080, () =>
    console.log('Server is listening to http://localhost:8080'),
  );
})();
