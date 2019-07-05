import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMovie } from '../../actions/movies.js';

import './movie-details.css';

// ------------------------------------------------------------
const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

// ------------------------------------------------------------
class ItemDetails extends Component {

    state = {
        item: null
    };

    componentDidUpdate(prevProps) {
        if (this.props.selected !== prevProps.selected) {
            this.updateItem();
        }
    }

    updateItem() {
        const { selected, movie } = this.props;

        if (!selected) {
            return;
        }

        this.setState({
            item: movie
        });
    };

    render() {

        const { item } = this.state;
        const children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item });
        });

        const content = (item) ? <ItemView item={item} children={children} /> : <span>Select an item from a list</span>;

        return (
            <div className="item-details card">
                {content}
            </div>
        );
    }
}

// ------------------------------------------------------------
const ItemView = ({ item, children }) => {

    const { title } = item;

    return (
        <React.Fragment>
            <div className="card-body">
                <h4>{title}</h4>
                <ul className="list-group list-group-flush">
                    {children}
                </ul>
            </div>
        </React.Fragment>
    );
}

// ------------------------------------------------------------
const MovieDetails = (props) => {
    return (
        <ItemDetails {...props} >
            <Record field="release_year" label="Year:" />
            <Record field="format" label="Format:" />
            <Record field="stars" label="Stars:" />
        </ItemDetails>
    );
};


const mapStateToProps = ({ movies: { movies, selected } }) => {
    return {
        movie: movies.find(item => item._id === selected),
        selected
    }
}


export default connect(mapStateToProps, { fetchMovie })(MovieDetails);