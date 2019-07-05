import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = () => {
    return (
        <div className="header d-flex">
            <h3>
                <Link to="/" >
                    Movies
                </Link>
            </h3>
            <ul className="d-flex">
                <li>
                    <Link to="/movies">Movies</Link>
                </li>
                <li>
                    <Link to="/movies/new">Add</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;