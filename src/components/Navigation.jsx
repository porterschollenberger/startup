import React from 'react';
import {Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const location = useLocation();
    const isLoggedIn = location.pathname !== '/';

    return (
        <nav>
            <i className="fa-solid fa-bars"></i>
            <ul className="nav-list">
                <li><Link to="/play">Play</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                <li><Link to="/achievements">Achievements</Link></li>
            </ul>
            <ul className="account-info">
                {isLoggedIn ? (
                    <>
                        <li><Link to="/">Logout</Link></li>
                        <li className="username">{'sampleuser145'}</li>
                    </>
                ) : (
                    <li><Link to="/">Login/Register</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;