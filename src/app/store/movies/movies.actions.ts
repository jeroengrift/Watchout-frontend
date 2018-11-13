import { Action } from '@ngrx/store';
import { Movie } from '../../domain/movie';

export enum MoviesActionTypes {
  GETALL = '[Movies] Get all',
  GETALL_SUCCESS = '[Movies] Get all success',
  GETALL_ERROR = '[Movies] Get all error'
}

export class GetAll implements Action {
  public readonly type = MoviesActionTypes.GETALL;

  constructor() { }
}

export class GetAllSuccess implements Action {
  public readonly type = MoviesActionTypes.GETALL_SUCCESS;
  
  constructor(public readonly movies: Movie[]) { }
}

export class GetAllError implements Action {
  public readonly type = MoviesActionTypes.GETALL_ERROR;
  
  constructor() { }
}

// export class Add implements Action {
//   public readonly type = MoviesActionTypes.ADD;
//   constructor(public readonly movies:   Movie[]) { }
// }

// export class Remove implements Action {
//   public readonly type = MoviesActionTypes.REMOVE;
//   constructor(public readonly Id: number) { }
// }

export type MoviesActionsUnion = GetAll | GetAllSuccess | GetAllError;
// export type VideosActionsUnion = Add | Remove;