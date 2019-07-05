import { parseFile } from '../utils/fileParser';
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
} from './types';

// -------------------------ACTIONS-----------------------------
const moviesRequested = () => {
    return {
        type: FETCH_MOVIES_REQUEST,
    };
};

const moviesLoaded = (movies) => {
    return {
        type: FETCH_MOVIES_SUCCESS,
        payload: movies
    };
};

const moviesError = (error) => {
    return {
        type: FETCH_MOVIES_FAILURE,
        payload: error
    };
};

export const addMovie = (movie) => {
    return {
        type: ADD_MOVIE,
        movie
    };
};

export const movieFetched = (movie) => {
    return {
        type: MOVIE_FETCHED,
        movie
    };
};

export const movieUpdated = (movie) => {
    return {
        type: MOVIE_UPDATED,
        movie
    };
};

export const movieDeleted = (movieId) => {
    return {
        type: MOVIE_DELETED,
        movieId
    };
};

export const movieSelected = (movieId) => {
    return {
        type: MOVIE_SELECTED,
        payload: movieId
    };
};

// ----------------- Search -----------------
export const searchMovies = (search_term) => {
    return {
        type: SEARCH_MOVIES,
        payload: search_term
    }
}

export const switchFilter = (search_by) => {
    return {
        type: SWITCH_FILTER,
        payload: search_by
    }
}


// -------------------------FUNCS-----------------------------
// Get all movies
export const fetchMovies = () => {
    return (dispatch) => {
        dispatch(moviesRequested());
        fetch('/api/movies')
            .then(res => res.json())
            .catch((err) => dispatch(moviesError(err)))
            .then(data => {
                dispatch(moviesLoaded(data.movies)
                )
            });
    }
};

// Get movie by id
export const fetchMovie = (id) => {
    return (dispatch) => {
        fetch(`/api/movies/${id}`)
            .then(res => res.json())
            .then(data => dispatch(movieFetched(data.movie)));
    }
};

// Save new movie
export const saveMovie = (data) => {
    return (dispatch) => {
        return fetch('/api/movies', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(addMovie(data.movie)));
    }
};

// Update movie
export const updateMovie = (data) => {
    return (dispatch) => {
        return fetch(`/api/movies/${data._id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(movieUpdated(data.movie)));
    }
};

// Delete movie
export const deleteMovie = (id) => {
    return (dispatch) => {
        return fetch(`/api/movies/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(movieDeleted(id)));
    }
};

export const loadFromFile = (file) => {

    return (dispatch) => {

        parseFile(file).then(data => {
            data.result.forEach(movie => {
                if (movie.title) {
                    dispatch(saveMovie(movie));
                }
            });
        });
    }
}


const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

