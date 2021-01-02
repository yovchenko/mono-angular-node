import {
  Component,
  OnInit
} from '@angular/core';
import { THero 
} from '@mono-angular-node/mono-libs';
import {
  HeroService
} from '../hero.service';
import {
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'mono-angular-node-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public focusEventEmitter = new EventEmitter < boolean > ();
  heroes: THero[];
  addHero: string;
  heroState: string;
  constructor(private heroService: HeroService) {}
  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
      });
  }
  isYourHero(name: string): string {
    if (name === this.addHero) {
      return this.heroState;
    }
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as THero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  
  delete(hero: THero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
