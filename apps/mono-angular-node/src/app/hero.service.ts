import {
  Injectable
} from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import {
  THero
} from '@mono-angular-node/mono-libs';
import {
  MessageService
} from './message.service';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  catchError,
  tap
} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'http://localhost:3333/api';
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  /** GET heroes from the server */
  getHeroes(): Observable < THero[] > {
    return this.http.get < THero[] > (`${this.heroesUrl}/heroes`, httpOptions)
      .pipe(
        tap(() => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(hero_id: number): Observable < THero > {
    const url = `${this.heroesUrl}/hero/${hero_id}`;
    return this.http.get < THero > (url)
      .pipe(
        tap(() => this.log(`fetched hero id=${hero_id}`)),
        catchError(this.handleError < THero> ('getHero'))
      );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: THero): Observable < THero > {
    const url = `${this.heroesUrl}/hero/${hero.hero_id}`;
    return this.http.put <THero> (url, hero, httpOptions)
      .pipe(
        tap(() => this.log(`updated hero id=${hero.hero_id}`)),
        catchError(this.handleError < THero > ('updateHero'))
      );
  }
  /** POST: add a new hero to the server */
  addHero(hero: THero): Observable < THero > {
    return this.http.post < THero > (`${this.heroesUrl}/hero`, hero, httpOptions)
      .pipe(
        tap((hero: THero) => this.log(`added hero w/ id=${hero.hero_id}`)),
        catchError(this.handleError < THero > ('addHero'))
      );
  }
  /** DELETE: delete the hero from the server */
  deleteHero(hero: THero | number): Observable < THero > {
    const hero_id = typeof hero === 'number' ? hero : hero.hero_id;
    const url = `${this.heroesUrl}/hero/${hero_id}`;
    return this.http.delete < THero > (url, httpOptions)
      .pipe(
        tap(() => this.log(`deleted hero id=${hero_id}`)),
        catchError(this.handleError < THero > ('deleteHero'))
      );
  }
  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable < THero[] > {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get < THero[] > (`${this.heroesUrl}/heroes/?name=${term}`)
      .pipe(
        tap(() => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError < THero[] > ('searchHeroes', []))
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError < T > (operation = 'operation', result ?: T) {
    return (error: Error): Observable < T > => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
