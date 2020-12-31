import appContainer from "./inversify.config";
import HeroService from './app.service';
import { SYMBOL } from '@mono-angular-node/mono-libs';

describe("Model test via Moongoose", () => {
    let heroService: HeroService;
    beforeAll(() => {
      heroService = appContainer.get<HeroService>(SYMBOL.HeroService);
      if(heroService.connection) {
        heroService.deleteHero("1");
      }
    });

    test('Check the connection to db', () => {
      expect(heroService.connection).toBeTruthy();
    });

    test('Select all heroes from db', async () => {
      await expect(
          heroService.getHeroes()
      ).resolves.toBeInstanceOf(Array);
    }); 
    
    test('Create a new document', async () => {
      await expect(
        heroService.postHero("1", "Superman")
      ).resolves.toEqual(
          expect.objectContaining({ hero_id: 1 })
      );
    }); 

    test('Create a new document with the same id', async () => {
      await expect(
        heroService.postHero("1", "Superman")
      ).rejects.toThrow();
    }); 

    test('Update the document created before', async () => {
      await expect(
        heroService.putHero("1", "Batman")
      ).resolves.toEqual(
        expect.objectContaining({ hero_id: 1, name: "Batman" })
      );
    }); 
});