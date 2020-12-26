
import { Container } from 'inversify';
import  MongoDb from './app.model';
import  HeroService from './app.service';
import { SYMBOL } from '@mono-angular-node/mono-libs';

const appContainer = new Container();
appContainer.bind<MongoDb>(SYMBOL.MongoDb).to(MongoDb);
appContainer.bind<HeroService>(SYMBOL.HeroService).to(HeroService);

export default appContainer;