import express from 'express';
import { Repository } from 'typeorm';

import { Weather } from '../weather.model';
import { model } from '../model';
import { isRequestForDay, isRequestForMonth } from './time-helper';

export const controller = (weatherRepository: Repository<Weather>) => {
  const weather = model(weatherRepository);

  return {
    async getAction(req: express.Request, res: express.Response) {
      const { city, day, month } = req.query;

      if (!city) {
        res.status(400).send('Bad request');
        return;
      }

      if (isRequestForDay(day)) {
        res.json(await weather.getWeatherOfDay(new Date(day), city));
        return;
      }

      if (isRequestForMonth(month)) {
        res.json(await weather.getWeatherOfMonth(new Date(month), city));
        return;
      }

      res.status(400).send('Bad request');
    },
  };
};
