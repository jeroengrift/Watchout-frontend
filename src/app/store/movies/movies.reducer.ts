import { MoviesActionsUnion, MoviesActionTypes } from './movies.actions';
import { Movie } from '../../domain/movie';

const initialState: Movie[] = [];

export const moviesReducer = (state = initialState, action: MoviesActionsUnion): Movie[] => {
    switch (action.type) {
        case MoviesActionTypes.GETALL_SUCCESS:
        return action.movies;
        // case MoviesActionTypes.REMOVE: {
        //     console.log('we went through the reducer')
        // return state.filter(movie => movie.id != action.id);
        // }
        // return state;
        default:
        return state;
    }
}