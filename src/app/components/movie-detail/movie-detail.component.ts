import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie }         from '../../domain/movie';
import { MovieService }  from '../../services/movie.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: [ './movie-detail.component.css' ]
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie;
  
  public MoviesChanges: FormGroup = new FormGroup(
  {
    name: new FormControl(''),
    description : new FormControl(''),
    rating: new FormControl(''),
    youtubeId: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  private getModel() {
    return <Movie>{
      id: this.movie.id,
      description: this.MoviesChanges.value.description,
      name: this.MoviesChanges.value.name,
      rating: this.MoviesChanges.value.rating,
      youtubeId: this.MoviesChanges.value.youtubeId
    };
  }

  getMovie(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id)
      .subscribe(movie => {
        this.movie = movie;
        this.MoviesChanges.controls['name'].setValue(this.movie.name);
        this.MoviesChanges.controls['description'].setValue(this.movie.description);
        this.MoviesChanges.controls['rating'].setValue(this.movie.rating);
        this.MoviesChanges.controls['youtubeId'].setValue(this.movie.youtubeId);
      });
  }

  goBack(): void {
    this.location.back();
  }

  save() {
    this.movieService.EditMovie(this.getModel()).subscribe();
  }

  getUrl() {
    const url = 'https://www.youtube.com/embed/' + this.movie.youtubeId;
    return url;
  }
}

