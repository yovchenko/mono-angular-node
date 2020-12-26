import {
  Component,
  OnInit
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  Subject
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
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
  selector: 'mono-angular-node-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  public focusEventEmitter = new EventEmitter<boolean>();
  heroes$: Observable < THero[] > ;
  private searchTerms = new Subject < string > ();
  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  focusInput() {
    this.focusEventEmitter.emit(true);
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}