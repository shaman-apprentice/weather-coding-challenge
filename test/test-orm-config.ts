import { ConnectionOptions } from 'typeorm';

import { Weather } from '../src/weather/weather.model';

export const options: ConnectionOptions = {
  type: 'sqlite',
  database: './test/test-db.sqlite3',
  entities: [Weather],
  dropSchema: true,
  synchronize: true,
  logging: ['error'],
};