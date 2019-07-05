import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchMovies, deleteMovie, movieSelected } from '../../actions/movies';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './movie-list.css';

// ----------------------------------------------------------------------------

const MovieList = ({ movies, onItemSelected, deleteMovie }) => {

    const items = movies.map((movie) => {
        const { _id, title, release_year } = movie;

        return (
            <li key={_id}
                className="list-group-item"
                onClick={() => onItemSelected(_id)}
            >
                <span>{title} - {release_year}</span>
                
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteMovie(_id)
                    }}
                    className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o" />
                </button>
                <Link to={`/movie/${_id}`} className="text-info float-right mr-3">Edit</Link>
            </li>
        );
    });

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    )
};

// ----------------------------------------------------------------------------
class MovieListContainer extends Component {

    componentDidMount() {
        this.props.fetchMovies();
    };

    onItemSelected = (id) => {
        this.props.movieSelected(id);
    };

    render() {
        const { movies,
            searched,
            search_term,
            loading,
            error } = this.props;


        if (loading)
            return <Spinner />;

        if (error)
            return <ErrorIndicator />;

        if (movies.length === 0) return <span className="content-message card">No movies to present</span>
        if (search_term !== '' && searched.length === 0) return <span className="content-message card">No matches :(</span>;


        return <MovieList movies={(searched.length === 0) ? movies : searched}
            onItemSelected={this.onItemSelected}
            deleteMovie={this.props.deleteMovie} />
    }
}

const mapStateToProps = ({ movies: { movies, searched, search_term, loading, error } }) => {
    return { movies, searched, search_term, loading, error };
};


export default connect(mapStateToProps, { fetchMovies, deleteMovie, movieSelected })(MovieListContainer); 