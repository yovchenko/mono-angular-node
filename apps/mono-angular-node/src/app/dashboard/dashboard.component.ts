import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  THero
} from '@mono-angular-node/mono-libs';
import { Subscription } from 'rxjs';
import {
  HeroService
} from '../hero.service';


@Component({
  selector: 'mono-angular-node-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: THero[] = [];
  subscription: Subscription;
  
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.subscription = this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 5));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }
}