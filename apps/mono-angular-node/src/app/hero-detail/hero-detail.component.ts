import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Location
} from '@angular/common';
import {
  THero
} from '@mono-angular-node/mono-libs';
import {
  HeroService
} from '../hero.service';
import {
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'mono-angular-node-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: THero;
  public focusEventEmitter = new EventEmitter<boolean>();
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  focusInput() {
    this.focusEventEmitter.emit(true);
  }
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}