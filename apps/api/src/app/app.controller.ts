import * as express from 'express';
import {Request, Response} from 'express';

const heroService = require('./hero.service');

export const router = express.Router();

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
