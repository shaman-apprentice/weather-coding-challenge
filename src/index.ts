import { Config as IServerConfig, startServer } from './server';
import { Weather } from './weather/weather.model';
import { openWeatherAPIKey } from './open-weather-api-key';


(async function main() {
  const config: IServerConfig = {
    cities: ['Berlin', 'Frankfurt', 'Munich'] as const,
    poll_interval: 1000 * 60 * 5,
    openWeatherAPIKey,
    connectionOptions: {
      type: 'sqlite',
      database: './db/db.sqlite3',
      entities: [Weather],
      logging: true,
    },
    port: 8080,
  };

  await startServer(config);
  console.log('Server is listening to http://localhost:8080');
})();