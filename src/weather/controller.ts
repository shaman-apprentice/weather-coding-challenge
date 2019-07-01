import express from 'express';
import { model } from './model';
import { Repository } from 'typeorm';
import { Weather } from './weather.model';

export const controller = (weatherRepository: Repository<Weather>) => {
  const weather = model(weatherRepository);

  return {
    getAction(req: express.Request, res: express.Response) {
      const { city, day, month } = req.query;

      if (!city) {
        res.status(400).send('Bad request');
        return;
      }

      if (
        day &&
        day.match(/^\d4-\d2-\d2$/) &&
        new Date(day).toString() !== 'invalid Date'
      ) {
        res.json(weather.getWeatherOfDay(new Date(day), city));
        return;
      }

      if (
        month &&
        month.match(/^\d4-\d2$/) &&
        new Date(month).toString() !== 'invalid Date'
      ) {
        res.json(weather.getWeatherOfMonth(new Date(day), city));
        return;
      }

      res.status(400).send('Bad request');
    },
  };
};
