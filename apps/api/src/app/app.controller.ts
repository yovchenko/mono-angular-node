import * as express from 'express';
import { Request, Response } from 'express';
import HeroService from './app.service';
import appContainer from "./inversify.config";
import { SYMBOL } from '@mono-angular-node/mono-libs';

const heroService = appContainer.get<HeroService>(SYMBOL.HeroService);

const router = express.Router();

router.get('/heroes', async (req: Request, res: Response) => {
  if(typeof req.query.name !== 'string') {
    try{
      const result = await heroService.getHeroes();
      res.status(200).json(result);
    } catch(error) {
      res.status(500).send(error);
    }
  }
  else {
    try{
      const result = await heroService
      .searchHeroes(req.query.name);
      res.status(200).json(result);
    } catch(error) {
      res.status(500).send(error);
    }
  }

});

router.get('/hero/:hero_id', async (req: Request, res: Response) => {
  try {
    const result = await heroService
    .getHero(req.params.hero_id, req.body.name);
    res.status(200).json(result);
  }catch(error) {
    res.status(500).send(error);
  }
});

router.post('/hero', async (req: Request, res: Response) => {
  try {
    const result = await heroService
    .postHero(req.body.hero_id, req.body.name);
    res.status(201).json(result);
  }catch(error) {
    res.status(500).send(error);
  }
});

router.put('/hero/:hero_id', async (req: Request, res: Response) => {
  try{
    const result = await heroService
    .putHero(req.params.hero_id, req.body.name);
    if(result) res.status(200).json(result);
    else res.status(404).send('Document not found!');
  }catch(error){
    res.status(500).send(error);
  }

});

router.delete('/hero/:hero_id', async (req: Request, res: Response) => {
  try {
    const result = await heroService
    .deleteHero(req.params.hero_id);
    if(result) res.status(200).json(result);
    else res.status(404).send('Document not found!');
  }catch(error) {
    res.status(500).send(error);
  }
});

export { router };