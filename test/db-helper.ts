import 'reflect-metadata';
import { ConnectionOptions, createConnection, Connection, Repository } from 'typeorm';

import { Weather } from '../src/weather/weather.model';
import { options as defaultOptions} from './test-orm-config';

let connection : Connection;

/*
 * @return Repository<Weather> - returns a Repository<Weather> from a fresh test db
 */
export async function getWeatherRepository(options?: ConnectionOptions): Promise<Repository<Weather>> {
  if (connection && connection.isConnected) 
    await connection.close(); 
  
  connection = await createConnection(options || defaultOptions);
  return connection.getRepository(Weather);
}