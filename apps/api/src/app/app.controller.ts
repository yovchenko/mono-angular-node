import * as express from 'express';
import { Request, Response } from 'express';
import HeroService from './app.service';
import appContainer from "./inversify.config";
import { SYMBOL } from '@mono-angular-node/mono-libs';

const heroService = appContainer.get<HeroService>(SYMBOL.HeroService);

const router = express.Router();

router.get('/heroes', (req: Request, res: Response) => {
  if(typeof req.query.name !== 'string')heroService.getHeroes(req, res);
  else heroService.searchHeroes(req, res, req.query.name);
});

router.get('/hero/:id', (req: Request, res: Response) => {
  heroService.getHero(req, res);
});

router.post('/hero', (req: Request, res: Response) => {
  heroService.postHero(req, res);
});

router.put('/hero/:id', (req: Request, res: Response) => {
  heroService.putHero(req, res);
});

router.delete('/hero/:id', (req: Request, res: Response) => {
  heroService.deleteHero(req, res);
});

export { router };