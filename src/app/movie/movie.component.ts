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
  private movie = new Movie;
  private description: string;
  private name: string;
  private rating: number;
  private youtubeId: string;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

    getMovies(): void {
    this.movieService.getMovies() 
    .subscribe(movies => this.movies = movies); 
  }

  addMovie() {
    this.movie.name = this.name;
    this.movie.description = this.description;
    this.movie.rating = this.rating;
    this.movie.youtubeId = this.youtubeId;
    this.movie.id
    this.movieService.addMovie(this.movie)
      .subscribe(movie => {
        this.movies.push(movie);
      });
  }

  deleteMovie(id: number) {
    alert("are you sure you want to delete this movie?")
    this.movieService.deleteMovie(id);
  }
}
