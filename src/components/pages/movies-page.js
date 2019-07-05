import React, { Component } from 'react';

import Row from '../row';
import { MovieDetails, MoviesList } from '../movie-components';
import SearchPanel from '../search-panel';


export default class MoviesPage extends Component {

    render() {

        return (
            <React.Fragment>
                <SearchPanel />
                <Row
                    left={<MoviesList />}
                    right={<MovieDetails />} />
                    
            </React.Fragment>
        );
    }
};
