import {
  Component,
  OnInit
} from '@angular/core';
import {
  THero
} from '@mono-angular-node/mono-libs';
import {
  HeroService
} from '../hero.service';


@Component({
  selector: 'mono-angular-node-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: THero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 5));
  }
}