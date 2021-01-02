import appContainer from "./inversify.config";
import HeroService from './app.service';
import { SYMBOL } from '@mono-angular-node/mono-libs';

describe("Model test via Moongoose", () => {
    let heroService: HeroService;
    const id = 1;
    beforeAll(() => {
      heroService = appContainer.get<HeroService>(SYMBOL.HeroService);
    });

    afterAll(() => {
        heroService.deleteHero(String(id));
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
        heroService.postHero("Superman")
      ).resolves.toEqual(
          expect.objectContaining({ hero_id: id })
      );
    }); 

    test('Create a new document with the same name', async () => {
      await expect(
        heroService.postHero("Superman")
      ).rejects.toThrow();
    }); 

    test('Update the document created before', async () => {
      await expect(
        heroService.putHero(String(id), "Batman")
      ).resolves.toEqual(
        expect.objectContaining({ hero_id: id, name: "Batman" })
      );
    }); 
});