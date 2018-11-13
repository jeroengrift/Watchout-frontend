import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { MoviesComponent }      from './components/movie/movie.component';
import { MovieDetailComponent }  from './components/movie-detail/movie-detail.component';
import { WatchComponent }  from './components/watch/watch.component';
import { AdminGuard } from './guard/admin.guard';
import {MapComponent} from './components/map/map.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'map', component: MapComponent },
  { path: 'watch/:id', component: WatchComponent },
  { path: 'movies', component: MoviesComponent, canActivate: [ AdminGuard ]  },
  { path: 'detail/:id', component: MovieDetailComponent, canActivate: [ AdminGuard ] },
  { path: 'movies', component: MoviesComponent, canActivate: [ AdminGuard ],
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

