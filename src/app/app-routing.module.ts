import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MoviesComponent }      from './movie/movie.component';
import { MovieDetailComponent }  from './movie-detail/movie-detail.component';
import { WatchComponent }  from './watch/watch.component';

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
