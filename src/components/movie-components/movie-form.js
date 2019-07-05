import React, { Component } from 'react';
import classnames from 'classnames';

import Spinner from '../spinner';
// ADD VALIDATOR

import './movie-form.css';

class MovieForm extends Component {

    state = {
        _id: this.props.movie ? this.props.movie._id : null,
        title: this.props.movie ? this.props.movie.title : '',
        release_year: this.props.movie ? this.props.movie.release_year : '',
        format: this.props.movie ? this.props.movie.format : 'VHS',
        stars: this.props.movie ? this.props.movie.stars : '',

        errors: {},
        loading: false
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            _id: nextProps.movie._id,
            title: nextProps.movie.title,
            release_year: nextProps.movie.release_year,
            format: nextProps.movie.format,
            stars: nextProps.movie.stars
        })
    }

    onChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];

            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    };

    onSubmit = (e) => {
        e.preventDefault();

        // validation - simple client-side. Other aspects - on server. FIX LATER
        let errors = {};
        if (this.state.title === '') errors.title = "Can't be empty";
        if (this.state.release_year === '') errors.release_year = "Can't be empty";
        if (this.state.stars === '') errors.stars = "Can't be empty";
        this.setState({ errors });


        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { _id, title, release_year, format, stars } = this.state;
            this.setState({ loading: true });

            this.props.saveMovie({ _id, title, release_year, format, stars })
                .catch((err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false })));
        }
    };

    render() {
        const form = (
            <form onSubmit={this.onSubmit}>
                <h2>Add New Movie</h2>

                {/* NEGATIVE MESSAGE */}
                {!!this.state.errors.global && <div className="alert alert-danger"><p>{this.state.errors.global}</p></div>}
                {/* SPINNER */}
                {this.state.loading ? <Spinner /> : null}

                <div className="form-row">
                    <div className="col-md-6">
                        {/* title */}
                        <label htmlFor="titleInput">Title</label>
                        <input className={classnames('form-control', { 'is-invalid': !!this.state.errors.title })}
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            id="titleInput"
                            placeholder="The Shawshank Redemption" />
                        <div className='invalid-feedback'>{this.state.errors.title}</div>
                    </div>

                    <div className="col-md-6">
                        {/* year */}
                        <label htmlFor="yearInput">Year of release</label>
                        <input className={classnames('form-control', { 'is-invalid': !!this.state.errors.release_year })}
                            type="text"
                            name="release_year"
                            value={this.state.release_year}
                            onChange={this.onChange}
                            id="yearInput"
                            placeholder="1994" />
                        <div className='invalid-feedback'>{this.state.errors.release_year}</div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-3">
                        {/* format */}
                        <label htmlFor="formatSelect">Format</label>
                        <select className="form-control"
                            id="formatSelect"
                            name="format"
                            value={this.state.format}
                            onChange={this.onChange}>
                            <option>VHS</option>
                            <option>DVD</option>
                            <option>Blu-Ray</option>
                        </select>
                    </div>

                    <div className="col-md-9">
                        {/* stars */}
                        <label htmlFor="starsInput">Stars</label>
                        <input className={classnames('form-control', { 'is-invalid': !!this.state.errors.stars })}
                            type="text"
                            name="stars"
                            id="starsInput"
                            placeholder="Tim Robbins, Morgan Freeman, Bob Gunton ..."
                            value={this.state.stars}
                            onChange={this.onChange} />
                        <div className='invalid-feedback'>{this.state.errors.stars}</div>
                    </div>
                </div>


                {/* submit button */}
                <button className="btn btn-primary" type="submit">Submit form</button>

                {/* IMPORT FROM FILE */}
                <p className="mt-3">Also you can easily import from file: </p>
                <div className="custom-file">
                    <input type="file"
                        accept=".txt"
                        onChange={this.props.onFileInput}
                        className="custom-file-input" id="customFile" />
                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                </div>
               
               {/* TODO: add spinner on file upload and message */}
            </form>
        );

        return (
            <div>
                {form}
            </div>
        );
    }
};

export default MovieForm;