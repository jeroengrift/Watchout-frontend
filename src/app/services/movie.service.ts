import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../domain/movie';
import { MessageService } from '../services/message.service';
import { Store } from '@ngrx/store';
import { MoviesActionTypes } from '../store/movies/movies.actions';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//make the service injectable. It is injected when you create components 
@Injectable({ 
  providedIn: 'root' })

export class MovieService {

  // URL to web api
  private moviesUrl = 'http://localhost:8080/api/film/'; 

  constructor(
    private http: HttpClient,
    //private store: Store<any>,
    private messageService: MessageService) { }

  getMovies (): Observable<Movie[]> {
    const url = `${this.moviesUrl}/`;
    return this.http.get<Movie[]>(url)
  }

  // getMoviesR() {
  //   this.http.get<Movie[]>(this.moviesUrl)
  //   .subscribe(movies => {
  //     this.store.dispatch({
  //       type: MoviesActionTypes.GETALL,
  //       payload: movies
  //     })
  //   });
  // }

  getMovie(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}${id}`;
    return this.http.get<Movie>(url)
  }

  searchMovies(term: string) {
    if (!term.trim()) {
      // if not search term, return empty movie array.
      return [];
    }
    return this.http.get<Movie[]>(`${this.moviesUrl}?name=${term}`)
  }

  addMovie (movie: Movie) :Observable<Movie> {
    const url = `${this.moviesUrl}`;
    return this.http.post<Movie>(url, movie, httpOptions)
  }

  deleteMovie (id: number): void {
    this.http.delete(this.moviesUrl + id).subscribe((data) => {});
  }

  EditMovie (movie: Movie): Observable<Movie> {
    const url = `${this.moviesUrl}${movie.id}`;
    const myJSON = JSON.stringify(movie);
    return this.http.put<Movie>(url, myJSON, httpOptions);
  }

  /** Log a MovieService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }
}
