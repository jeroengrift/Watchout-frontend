import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './app-state.interface';
import { moviesReducer } from './movies/movies.reducer';

export const rootReducer: ActionReducerMap<IAppState> = {
  movies: moviesReducer
};
