import React, { Component } from 'react';
import { connect } from 'react-redux';

import { switchFilter, searchMovies } from '../../actions/movies';

import './search-panel.css';

const filterButtons = [
    { name: 'movies', label: 'Movies' },
    { name: 'actors', label: 'Actors' }
];

const SearchByTrigger = ({ search_by, onFilterSwitch = () => { } }) => {

    const buttons = filterButtons.map(({ name, label }) => {
        const isActive = name === search_by;
        const classNames = 'btn ' + (isActive ? 'btn-info' : 'btn-outline-secondary');
        return (
            <button key={name}
                type="button"
                onClick={() => onFilterSwitch(name)}
                className={classNames}>{label}</button>
        );
    });
    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
};

export { SearchByTrigger };


class SearchPanel extends Component {

    onTermChange = (e) => {
        const { searchMovies } = this.props;
        searchMovies(e.target.value);
    };

    onFilterSwitch = (search_by) => {
        const { switchFilter } = this.props;
        switchFilter(search_by);
    };

    render() {
        const { search_term, search_by } = this.props;

        return (
            <div className="search-panel d-flex">
                <input type="text"
                    className="form-control search-input"
                    placeholder="Search"
                    value={search_term}
                    onChange={this.onTermChange} />

                <SearchByTrigger
                    search_by={search_by}
                    onFilterSwitch={this.onFilterSwitch}
                />
            </div>
        );
    };
};

const mapStateToProps = ({ movies: { search_term, search_by } }) => {
    return {
        search_term,
        search_by
    };
};

export default connect(mapStateToProps, { switchFilter, searchMovies })(SearchPanel);