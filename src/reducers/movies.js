// -----------------------CONSTANTS-----------------------------
import {
    FETCH_MOVIES_REQUEST,
    FETCH_MOVIES_SUCCESS, 
    FETCH_MOVIES_FAILURE,

    ADD_MOVIE,
    MOVIE_FETCHED,
    MOVIE_UPDATED,
    MOVIE_SELECTED,
    MOVIE_DELETED,

    SEARCH_MOVIES,
    SWITCH_FILTER
} from '../actions/types';

// ---------------------initial state---------------------------
const initialState = {
    movies: [],
    loading: true,
    error: null,
    selected: null,

    search_term: '',
    search_by: 'movies',
    searched: [],
};

// =-----------------------reducer-------------------------------
const movies = (state = initialState, action = {}) => {
    switch (action.type) {

        case FETCH_MOVIES_REQUEST:
            return {
                ...state,
                movies: [],
                loading: true,
                error: null
            };

        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload,
                loading: false,
                error: null,
            };

        case FETCH_MOVIES_FAILURE:
            return {
                ...state,
                movies: [],
                loading: false,
                error: action.payload,
            };

        case ADD_MOVIE:
            return {
                ...state,
                movies: [
                    ...state.movies,
                    action.movie
                ]
            };

        case MOVIE_DELETED:
            return {
                ...state,
                movies: state.movies.filter(item => item._id !== action.movieId)
            };

        case MOVIE_UPDATED:
            return {
                ...state,
                movies: state.movies.map(item => {
                    if (item._id === action.movie._id) return action.movie;
                    return item;
                })
            };

        case MOVIE_SELECTED:
            return {
                ...state,
                selected: action.payload
            };

        case MOVIE_FETCHED:
            const index = state.movies.findIndex(item => item._id === action.movie._id);

            if (index > -1) {
                return {
                    ...state,
                    movies: state.movies.map(item => {
                        if (item._id === action.movie._id) return action.movie;
                        return item;
                    })
                };
            } else {
                return {
                    ...state,
                    movies: [
                        ...state.movies,
                        action.movie
                    ]
                };
            };

        case SEARCH_MOVIES:

            return {
                ...state,
                search_term: action.payload,
                searched: search(state.movies, state.search_by, action.payload)
            }

        case SWITCH_FILTER:

            return {
                ...state,
                search_by: action.payload,
                searched: search(state.movies, action.payload, state.search_term)
            }

        default: return state;
    };
};

const search = (movies, search_by, search_term) => {

    let result = [];

    if (search_term === '') return result;

    if (search_by === 'movies') {
        result = movies.filter((movie) => {
            return movie.title.toLowerCase().indexOf(search_term.toLowerCase()) > -1;
        });
    }
    if (search_by === 'actors') {
        result = movies.filter((movie) => {
            return movie.stars.toLowerCase().indexOf(search_term.toLowerCase()) > -1;
        });
    }

    return result;
}

export default movies;