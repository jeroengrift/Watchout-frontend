import { Component, OnInit } from '@angular/core';
import { Movie } from '../../domain/movie';
import { MovieService } from '../../services/movie.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app-state.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MoviesComponent implements OnInit {
  movies: Observable<Movie[]>;
  // movie: Movie = new Movie;

  public MoviesChanges: FormGroup = new FormGroup(
    {
      name: new FormControl(''),
      description: new FormControl(''),
      rating: new FormControl(''),
      youtubeId: new FormControl('')
    });

    constructor(private store: Store<IAppState>, private movieservice: MovieService) { }
    
  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movies = this.store.pipe(select(s => s.movies));
  }

  // addMovie() {
  //   this.movie.name = this.MoviesChanges.controls['name'].value;
  //   this.movie.description = this.MoviesChanges.controls['description'].value
  //   this.movie.rating = this.MoviesChanges.controls['rating'].value
  //   this.movie.youtubeId = this.MoviesChanges.controls['youtubeId'].value
  //   this.movieService.addMovie(this.getModel())
  //     .subscribe(movie => {
  //       this.movies.push(movie);
  //     });
  // }

  deleteMovie(id: number) {
    alert("are you sure you want to delete this movie?")
    this.movieservice.deleteMovie(id);
  }

  private getModel() {
    return <Movie>{
      name: this.MoviesChanges.value.name,
      description: this.MoviesChanges.value.description,
      rating: this.MoviesChanges.value.rating,
      youtubeId: this.MoviesChanges.value.youtubeId
    };
  }

  getYoutubeImg(url: string){  
    const youtubeImgdUrl = 'https://img.youtube.com/vi/';     
    // return  youtubeImgdUrl + id + '/maxresdefault.jpg';    
    return  youtubeImgdUrl + url + '/maxresdefault.jpg';   }

}
