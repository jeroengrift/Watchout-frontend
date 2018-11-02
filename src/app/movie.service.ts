import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Movie } from './movie';
import { MessageService } from './message.service';

//make a constant httpOptions and set the data type to application/json
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

  /** GET movies from the server */
  getMovies () {
    const url = `${this.moviesUrl}/`;
    return this.http.get<Movie[]>(url)
    // .pipe(
    //     tap(_ => this.log('fetched movies')),
    //     catchError(this.handleError('getMovies', []))
    //   );
  }

  // /** GET movie by id. Return `undefined` when id not found */
  // getMovieNo404<Data>(id: number) {
  //   const url = `${this.moviesUrl}/?id=${id}`;
  //   return this.http.get<Movie[]>(url)
  //     .pipe(
  //       map(movies => movies[0]), // returns a {0|1} element array
  //       tap(h => {
  //         const outcome = h ? `fetched` : `did not find`;
  //         this.log(`${outcome} movie id=${id}`);
  //       }),
  //       catchError(this.handleError<Movie>(`getMovie id=${id}`))
  //     );
  // }

  /** GET movie by id. Will 404 if id not found */
  getMovie(id: number) {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url)
    // .pipe(
    //   tap(_ => this.log(`fetched movie id=${id}`)),
    //   catchError(this.handleError<Movie>(`getMovie id=${id}`))
    // );
  }

  /* GET movies whose name contains search term */
  searchMovies(term: string) {
    if (!term.trim()) {
      // if not search term, return empty movie array.
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesUrl}/?name=${term}`)
    // .pipe(
    //   tap(_ => this.log(`found movies matching "${term}"`)),
    //   catchError(this.handleError<Movie[]>('searchMovies', []))
    // );
  }

  //////// Save methods //////////

  /** POST: add a new movie to the server */
  addMovie (movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, movie, httpOptions)
    // .pipe(
    //   tap((movie: Movie) => this.log(`added movie w/ id=${movie.id}`)),
    //   catchError(this.handleError<Movie>('addMovie'))
    // );
  }

  /** DELETE: delete the movie from the server */
  deleteMovie (movie: Movie | number): Observable<Movie> {
    const id = typeof movie === 'number' ? movie : movie.id;
    const url = `${this.moviesUrl}/${id}`;

    return this.http.delete<Movie>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted movie id=${id}`)),
      catchError(this.handleError<Movie>('deleteMovie'))
    );
  }

  /** PUT: update the movie on the server */
  updateMovie (movie: Movie): Observable<any> {
    return this.http.put(this.moviesUrl, movie, httpOptions).pipe(
      tap(_ => this.log(`updated movie id=${movie.id}`)),
      catchError(this.handleError<any>('updateMovie'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a MovieService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }
}
