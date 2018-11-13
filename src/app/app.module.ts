import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { MoviesComponent } from './components/movie/movie.component';
import { WatchComponent } from './components/watch/watch.component';

import { SafePipe } from './pipes/safe.pipe';
import { IAppState } from './store/app-state.interface';
import { rootReducer } from './store/app.reducer';
import { moviesReducer } from './store/movies/movies.reducer';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { MovieService } from './services/movie.service';
import { AddHeaderInterceptor } from './interceptors/addheader.interceptor';
import { MapComponent } from './components/map/map.component';
import { EffectsModule } from '@ngrx/effects'
import { MovieEffects } from './store/movies/movies.effects';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot<IAppState>(rootReducer),
    // StoreModule.forRoot({ movies: moviesReducer }),
    StoreDevtoolsModule.instrument(),
    ReactiveFormsModule,
    EffectsModule.forRoot([ MovieEffects])
  ],

  declarations: [
    AppComponent,
    DashboardComponent,
    MoviesComponent,
    MovieDetailComponent,
    MessagesComponent,
    MovieSearchComponent,
    SafePipe,
    WatchComponent,
    LoginComponent,
    MapComponent,
  ],

  providers: [
    LoginService,
    MovieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

