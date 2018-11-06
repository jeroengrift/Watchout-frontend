import { Component, OnInit } from '@angular/core';
import { Movie } from '../../domain/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies()
    .subscribe(movies => this.movies = movies);
  }

  getYoutubeImg(url: string){  
    const youtubeImgdUrl = 'https://img.youtube.com/vi/';     
    // return  youtubeImgdUrl + id + '/maxresdefault.jpg';    
    return  youtubeImgdUrl + url + '/0.jpg';   }
}  
