import { MoviesActionsUnion, MoviesActionTypes } from './movies.actions';
import { Movie } from '../../domain/movie';

const initialState = []

export const moviesReducer = (state = initialState, action: MoviesActionsUnion) => {
    switch (action.type) {
        case MoviesActionTypes.GETALL:
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