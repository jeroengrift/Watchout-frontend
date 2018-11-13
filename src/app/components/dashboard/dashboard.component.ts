import { Component, OnInit } from '@angular/core';
import { Movie } from '../../domain/movie';
import { MovieService } from '../../services/movie.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app-state.interface';
import * as movieActions from '../../store/movies/movies.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  movies: Observable<Movie[]>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.store.dispatch(new movieActions.GetAll());
    this.movies = this.store.pipe(select(s => s.movies));
  }


  // getMovies() {
  //   this.movieService.getMovies()
  //   .subscribe(movies => this.movies = movies);
  // }

  getYoutubeImg(url: string){  
    const youtubeImgdUrl = 'https://img.youtube.com/vi/';     
    // return  youtubeImgdUrl + id + '/maxresdefault.jpg';    
    return  youtubeImgdUrl + url + '/maxresdefault.jpg';   }
}  
