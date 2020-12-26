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
  isYourHero(name): string {
    if (name === this.addHero) {
      return this.heroState;
    }
  }
  add(name: string): void {
      this.focusEventEmitter.emit(true);
      const heroesNames = [],
        heroesID = [];
      this.heroes
        .forEach((hero) => {
          if (typeof heroesNames[hero.name.length] === 'undefined') {
            heroesNames[hero.name.length] = [];
          }
          heroesID.push(hero.id);
          heroesNames[hero.name.length].push(hero.name);
        });
      heroesID.sort((a, b) => a - b);
      let namesLen = 0,
        id = 0;
      const idLen = heroesID.length;
      name = name.trim();
      if (!name) {
        return;
      } else {
        const nameLen = name.length;
        if (typeof heroesNames[nameLen] === 'undefined') {
          heroesNames[nameLen] = [];
        } else {
          namesLen = heroesNames[nameLen].length;
        }
        if (namesLen === 0) {
          heroesNames[nameLen].push(name);
        } else {
          for (let i = 0; i < namesLen; i++) {
            if (heroesNames[nameLen][i].toUpperCase() === name.toUpperCase()) {
              this.heroState = 'danger';
              this.addHero = heroesNames[nameLen][i];
              return;
            } else {
              heroesNames[nameLen].push(name);
            }
          }
        }
      }
      if (heroesID.length === 0 || heroesID[0] !== 1) {
        id = 1;
      } else {
        let k = 1;
        for (let j = 1; j < heroesID[heroesID.length - 1] + 1; j++) {
          if (j < heroesID[heroesID.length - 1]) {
            if (heroesID[k] > j && j !== 1) {
              id = j;
              break;
            } else if (heroesID[k] === j) {
              k++;
            }
          } else {
            id = ++j;
          }
        }
      }

    this.heroService.addHero({ id, name } as THero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.heroState = 'success';
        this.addHero = this.heroes[this.heroes.length - 1].name;
      });
  }
  delete(hero: THero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
