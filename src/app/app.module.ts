import { NgModule}       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MovieDetailComponent }  from './movie-detail/movie-detail.component';
import { MoviesComponent }      from './movie/movie.component';
import { MovieSearchComponent }  from './movie-search/movie-search.component';
import { MessagesComponent }    from './messages/messages.component';
import { SafePipe } from './safe.pipe';
import { WatchComponent } from './watch/watch.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
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
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }