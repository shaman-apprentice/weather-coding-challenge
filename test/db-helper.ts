import 'reflect-metadata';
import { ConnectionOptions, createConnection, Connection } from 'typeorm';

import { Weather } from '../src/weather/weather.model';

const options: ConnectionOptions = {
  type: 'sqlite',
  database: './test/test-db.sqlite3',
  entities: [Weather],
  dropSchema: true,
  synchronize: true,
};

let connection : Connection;

/*
 * @return Repository<Weather> - returns a Repository<Weather> from a fresh test db
 */
export const getWeatherRepository = async () => {
  if (connection && connection.isConnected) 
    await connection.close(); 
  
  connection = await createConnection(options);
  return connection.getRepository(Weather);
}