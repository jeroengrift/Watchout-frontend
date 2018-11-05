import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie } from './movie';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//make the service injectable. It is injected when you create components 
@Injectable({ providedIn: 'root' })
export class MovieService {

  // URL to web api
  private moviesUrl = 'http://localhost:8080/api/film'; 

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getMovies () {
    const url = `${this.moviesUrl}/`;
    return this.http.get<Movie[]>(url)
  }

  getMovie(id: number) {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url)
  }

  searchMovies(term: string) {
    if (!term.trim()) {
      // if not search term, return empty movie array.
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesUrl}/?name=${term}`)
  }

  addMovie (movie: Movie): Observable<Movie> {
    const url = `${this.moviesUrl}/`;
    return this.http.post<Movie>(url, movie, httpOptions)
  }

  deleteMovie (id: number) {
    this.http.delete(this.moviesUrl + '/' + id).subscribe((data) => {});
  }

  updateMovie (movie: Movie): Observable<any> {
    const url = `${this.moviesUrl}/${movie.id}`;
    return this.http.put(url, movie, httpOptions)
  }

  /** Log a MovieService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }
}
