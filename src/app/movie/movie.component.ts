import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MoviesComponent implements OnInit {
  movies: Movie[];

  //every time a new component instance is made, a new movieservice is created
  constructor(private movieService: MovieService) { }

  //every time a new component instance is made, the instance method getMovies is called. 
  ngOnInit() {
    this.getMovies();
  }

  //getMovies calls the movieservice method getMovies (verwarrend). It is separated for flexibility.
    getMovies(): void {
    this.movieService.getMovies() //this becuase it is created wihtin this instance.
    .subscribe(movies => this.movies = movies); //subscribe? uizoeken
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.movieService.addMovie({ name } as Movie)
      .subscribe(movie => {
        this.movies.push(movie);
      });
  }

  delete(movie: Movie): void {
    this.movies = this.movies.filter(h => h !== movie);
    this.movieService.deleteMovie(movie).subscribe();
  }

}
