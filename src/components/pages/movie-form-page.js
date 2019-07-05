import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { saveMovie, fetchMovie, updateMovie, loadFromFile } from '../../actions/movies';

import { MovieForm } from '../movie-components/';

class MovieFormPage extends Component {

    state = {
        redirect: false
    };

    componentDidMount = () => {
        const { match } = this.props;
        if (match.params._id) {
            this.props.fetchMovie(match.params._id)
        };
    };

    saveMovie = ({ _id, title, release_year, format, stars }) => {
        if (_id) {
            return this.props.updateMovie({ _id, title, release_year, format, stars })
                .then(
                    () => { this.setState({ redirect: true }) }
                );
        } else {
            return this.props.saveMovie({ title, release_year, format, stars })
                .then(
                    () => { this.setState({ redirect: true }) }
                );
        };
    };

    onFileInput = (e) => {
        const file = e.target.files[0];
        this.props.loadFromFile(file);
    }

    render() {
        return (
            <div>
                {
                    this.state.redirect ?
                        <Redirect to="/movies" /> :
                        <MovieForm
                            movie={this.props.movie}
                            saveMovie={this.saveMovie}
                            onFileInput={this.onFileInput}
                        />
                }
            </div>
        );
    };
};

const mapStateToProps = (state, props) => {
    const { match } = props;
    if (match.params._id) {
        return {
            movie: state.movies.movies.find(item => item._id === match.params._id)
        };
    }

    return { movie: null };
};


export default connect(mapStateToProps, { saveMovie, fetchMovie, updateMovie, loadFromFile })(MovieFormPage);