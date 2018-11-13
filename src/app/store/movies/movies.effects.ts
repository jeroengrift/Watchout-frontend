import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as movieActions from './movies.actions';
import { Action } from '@ngrx/store';
import { MoviesActionTypes } from './movies.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../domain/movie';

@Injectable()
export class MovieEffects {

    constructor(

        private readonly movieService: MovieService,
        private readonly actions$: Actions) { }

    @Effect()
    load$: Observable<movieActions.GetAllSuccess | movieActions.GetAllError> = this.actions$.pipe(
        ofType(MoviesActionTypes.GETALL),
        mergeMap(action =>
            this.movieService.getMovies().pipe(
                // If successful, dispatch success action with result
                map((videos) => new movieActions.GetAllSuccess(videos)),
                // If request fails, dispatch failed action
                catchError(() => of(new movieActions.GetAllError()))
            )
        )
    );
}

