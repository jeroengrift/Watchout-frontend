import { Action } from '@ngrx/store';
import { Movie } from '../../domain/movie';

export enum MoviesActionTypes {
  GETALL = 'Get all [Movies]',
}

export class GetAll implements Action {
  public readonly type = MoviesActionTypes.GETALL;
  constructor(public readonly movies: Movie[]) { }
}

// export class Add implements Action {
//   public readonly type = MoviesActionTypes.ADD;
//   constructor(public readonly movies:   Movie[]) { }
// }

// export class Remove implements Action {
//   public readonly type = MoviesActionTypes.REMOVE;
//   constructor(public readonly Id: number) { }
// }

export type MoviesActionsUnion = GetAll;
// export type VideosActionsUnion = Add | Remove;