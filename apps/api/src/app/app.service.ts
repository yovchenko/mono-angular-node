import { Hero } from './hero.schema';
import MongoDb from './app.model';
import { injectable, inject } from "inversify";
import { SYMBOL, THero } from '@mono-angular-node/mono-libs';
import "reflect-metadata";

@injectable()
export default class HeroService {
    private _connection = false;

    constructor(
    @inject(SYMBOL.MongoDb) mongoDb: MongoDb,   
    ) 
    {  
        try{
            mongoDb.connect()
            this._connection = true;
        }catch(error) {
            console.error(error);
        }
    }

    get connection() {
        return this._connection;
    }

    public async getHeroes() {   
    const docquery = Hero.find({});
    return docquery
        .exec()
        .then(heroes => {
            return heroes;
        })
        .catch(error => {
            throw new Error("There was an error in handling the GET request " + error);
        });
    }

    public async getHero(id: string, name: string) {
    const originalHero: THero = {
        hero_id: parseInt(id, 10),
        name: name
    };
    const docquery = Hero.findOne({
        hero_id: originalHero.hero_id
    });
    return docquery
        .exec()
        .then(hero => {
            return hero;
        })
        .catch(error => {
            throw new Error("There was an error in handling the GET request " + error);
        });
    }

    public async searchHeroes(urlParam: string) {
    const docquery = Hero.find({
        'name': {
        $regex: '^' + urlParam,
        $options: 'i'
        }
    });
    return docquery
        .exec()
        .then(heroes => {
            return heroes;
        })
        .catch(error => {
            throw new Error("There was an error in handling the GET request " + error);
        });
    }

    public async postHero(id: string, name: string) {
    const originalHero = {
        hero_id: parseInt(id, 10),
        name: name
    };
    const hero = new Hero(originalHero);
        try {
            await hero.save(); 
            return hero;
        }catch(error) {
            throw new Error("There was an error in handling the POST request " + error);
        }
    }

    public async putHero(id: string, name: string) {
    const originalHero: THero = {
        hero_id: parseInt(id, 10),
        name: name
    };
    const docquery = Hero.findOne({
        hero_id: originalHero.hero_id
    }); 
    return docquery
        .exec()
        .then(async hero => {
            if(!hero) return null;
            hero.name = originalHero.name;
            try {
                await hero.save(); 
                return hero;
            }catch(error) {
                throw new Error("The doc cannot be added to the database " + error);
            }
        })
        .catch(error => {
            throw new Error("There was an error in handling the PUT request " + error);
        });
    }

    public async deleteHero(id: string) {
    const hero_id = parseInt(id, 10);
    const docquery = Hero.findOneAndRemove({
        hero_id: hero_id
    });
    return docquery
        .exec()    
        .then(hero => {
            if(!hero) return null;
            return hero;
        })
        .catch(error => {
            throw new Error("There was an error in handling the DELETE request " + error);
        });
    }
}