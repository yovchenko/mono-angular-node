import appContainer from "./inversify.config";
import HeroService from './app.service';
import { SYMBOL } from '@mono-angular-node/mono-libs';

describe("Model test via Moongoose", () => {
    let heroService: HeroService;
    beforeAll(() => {
      heroService = appContainer.get<HeroService>(SYMBOL.HeroService);
    });

    test('Check the connection to db', () => {
      expect(heroService.connection).toBeTruthy();
    });

    test('Select all heroes from db', async () => {
      await expect(
          heroService.getHeroes()
      ).resolves.toBeInstanceOf(Array);
    }); 
});