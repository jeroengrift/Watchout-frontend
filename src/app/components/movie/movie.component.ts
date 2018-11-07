import { Component, OnInit } from '@angular/core';
import { Movie } from '../../domain/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MoviesComponent implements OnInit {
  movies: Movie[];
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

  addMovie(){
    this.movieService.addMovie(this.name, this.youtubeId, this.rating, this.description)
      .subscribe(movie => {
        this.movies.push(movie);
      });
  }

  deleteMovie(id: number) {
    alert("are you sure you want to delete this movie?")
    this.movieService.deleteMovie(id);
  }
}
