import { Hero } from './hero.schema';
import MongoDb from './app.model';
import { Request, Response } from 'express';
import { injectable, inject } from "inversify";
import { SYMBOL, THero } from '@mono-angular-node/mono-libs';
import "reflect-metadata";

@injectable()
export default class HeroService {
    constructor(
    @inject(SYMBOL.MongoDb) _mongoDb: MongoDb,   
    ) 
    {
        _mongoDb.connect();
    }
    
    public async getHeroes() {   
    const docquery = Hero.find({});
    return docquery
        .exec()
        .then(heroes => {
            return heroes;
        })
        .catch(error => {
            return new Error("There was an error in handling the request " + error);
        });
    }

    public getHero(req: Request, res: Response) {
    const originalHero: THero = {
        hero_id: parseInt(req.params.hero_id, 10),
        name: req.body.name
    };
    const docquery = Hero.findOne({
        hero_id: originalHero.hero_id
    });
    docquery
        .exec()
        .then(hero => {
            res.status(200).json(hero);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        });
    }

    public searchHeroes(req: Request, res: Response, urlParam) {
    const docquery = Hero.find({
        'name': {
        $regex: '^' + urlParam,
        $options: 'i'
        }
    });
    docquery
        .exec()
        .then(heroes => {
            res.status(200).json(heroes);
        })
        .catch(error => {
            res.status(500).send(error);
        return;
        });
    }

    public postHero(req: Request, res: Response) {
    const originalHero: THero = {
        hero_id: req.body.hero_id,
        name: req.body.name
    };
    const hero = new Hero(originalHero);
    hero.save(error => {
        if (this.checkServerError(res, error)) return;
        res.status(201).json(hero);
        console.log('Hero created successfully!');
    });
    }

    private checkServerError(res, error) {
    if (error) {
        res.status(500).send(error);
        return error;
    }
    }

    public putHero(req: Request, res: Response) {
    const originalHero: THero = {
        hero_id: parseInt(req.params.hero_id, 10),
        name: req.body.name
    };
    Hero.findOne({
        hero_id: originalHero.hero_id
    }, (error: Error, hero) => {
        if (this.checkServerError(res, error)) return;
        if (!this.checkFound(res, hero)) return;

        hero.name = originalHero.name;
        hero.save((error: Error) => {
        if (this.checkServerError(res, error)) return;
        res.status(200).json(hero);
        console.log('Hero updated successfully!');
        });
    });
    }

    public deleteHero(req: Request, res: Response) {
    const hero_id = parseInt(req.params.hero_id, 10);
    Hero.findOneAndRemove({
        hero_id: hero_id
        })
        .then(hero => {
        if (!this.checkFound(res, hero)) return;
        res.status(200).json(hero);
        console.log('Hero deleted successfully!');
        })
        .catch(error => {
        if (this.checkServerError(res, error)) return;
        });
    }

    private checkFound(res: Response, hero) {
    if (!hero) {
        res.status(404).send('Hero not found.');
        return;
    }
    return hero;
    }

}