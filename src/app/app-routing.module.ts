import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { MoviesComponent }      from './components/movie/movie.component';
import { MovieDetailComponent }  from './components/movie-detail/movie-detail.component';
import { WatchComponent }  from './components/watch/watch.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'watch/:id', component: WatchComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
