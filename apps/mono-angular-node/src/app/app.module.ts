import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  FormsModule
} from '@angular/forms';
import {
  AppComponent
} from './app.component';
import {
  HeroDetailComponent
} from './hero-detail/hero-detail.component';
import {
  HeroesComponent
} from './heroes/heroes.component';
import {
  HeroService
} from './hero.service';
import {
  MessageService
} from './message.service';
import {
  AppRoutingModule
} from '../app/app-routing/app-routing.module';
import {
  DashboardComponent
} from './dashboard/dashboard.component';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  HeroSearchComponent
} from './hero-search/hero-search.component';
import {
  FocusDirective
} from './focus.directive';
import {
  ServiceWorkerModule
} from '@angular/service-worker';
import {
  environment
} from '../environments/environment';
import { BrowserAnimationsModule 
} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroSearchComponent,
    FocusDirective
  ],
  providers: [HeroService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}