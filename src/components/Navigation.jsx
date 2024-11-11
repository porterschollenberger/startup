import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <nav>
            <i className="fa-solid fa-bars"></i>
            <ul className="nav-list">
                <li><Link to="/play">Play</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                <li><Link to="/achievements">Achievements</Link></li>
            </ul>
            <ul className="account-info">
                <li><Link to="/">Logout</Link></li>
                <li className="username">username</li>
            </ul>
        </nav>
    );
}

export default Navigation;