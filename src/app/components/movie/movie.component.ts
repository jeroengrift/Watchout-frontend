import { Component, OnInit } from '@angular/core';
import { Movie } from '../../domain/movie';
import { MovieService } from '../../services/movie.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movies',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MoviesComponent implements OnInit {
  movies: Movie[];
  movie: Movie = new Movie;

  public MoviesChanges: FormGroup = new FormGroup(
    {
      name: new FormControl(''),
      description: new FormControl(''),
      rating: new FormControl(''),
      youtubeId: new FormControl('')
    });

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies);
  }

  addMovie() {
    this.movie.name = this.MoviesChanges.controls['name'].value;
    this.movie.description = this.MoviesChanges.controls['description'].value
    this.movie.rating = this.MoviesChanges.controls['rating'].value
    this.movie.youtubeId = this.MoviesChanges.controls['youtubeId'].value
    this.movieService.addMovie(this.getModel())
      .subscribe(movie => {
        this.movies.push(movie);
      });
  }

  deleteMovie(id: number) {
    alert("are you sure you want to delete this movie?")
    this.movieService.deleteMovie(id);
  }

  private getModel() {
    return <Movie>{
      description: this.MoviesChanges.value.description,
      name: this.MoviesChanges.value.name,
      rating: this.MoviesChanges.value.rating,
      youtubeId: this.MoviesChanges.value.youtubeId
    };
  }
}
