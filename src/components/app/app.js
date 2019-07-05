import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../header';
import { MoviesPage, MovieFormPage } from '../pages';


export default class App extends Component {


    componentDidCatch() {
        this.setState({ hasError: true });
    };

    render() {

        return (
            <div className="movies-db-app">
                <Header />
                <Switch>
                    <Route path="/"
                        render={() => <h2>Welcome to Movies App</h2>}
                        exact />

                    <Route exact path="/movies" component={MoviesPage} />
                    <Route path="/movies/new" component={MovieFormPage} />
                    <Route path="/movie/:_id" component={MovieFormPage} />

                    <Route render={() => <h2>Page not found</h2>} />
                </Switch>
            </div>

        );
    }
}


