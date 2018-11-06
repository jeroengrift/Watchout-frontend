import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie }         from '../movie';
import { MovieService }  from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: [ './movie-detail.component.css' ]
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie;

  private description: string;
  private name: string;
  private rating: number;
  private youtubeId: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  goBack(): void {
    this.location.back();
  }

 editMovie(): void {
   this.movie.name = this.name;
   this.movie.description = this.description;
   this.movie.rating = this.rating;
   this.movie.youtubeId = this.youtubeId;
    this.movieService.EditMovie(this.movie)
      .subscribe(() => this.goBack());
  }

  getUrl() {
    const url = 'https://www.youtube.com/embed/' + this.movie.youtubeId;
    return url;
  }
}

