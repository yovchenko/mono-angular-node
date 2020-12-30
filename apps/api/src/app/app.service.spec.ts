import appContainer from "./inversify.config";
import HeroService from './app.service';
import { SYMBOL } from '@mono-angular-node/mono-libs';

const heroService = appContainer.get<HeroService>(SYMBOL.HeroService);

describe("Service test", async () => {
    expect(1).toBe(1)
    await expect(
        heroService.getHeroes()
      ).rejects.toThrow();
});