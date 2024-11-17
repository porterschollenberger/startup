import React from 'react';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const navigate = useNavigate();

    const location = useLocation();
    const isLoggedIn = location.pathname !== '/';

    const handleLogout = async () => {
        const response = await fetch('api/auth/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
            }),
        });
        if (response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/');
        } else {
            const errorData = await response.json();
            alert(errorData.msg || 'Logout failed');
        }
    }

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
                        <li><button onClick={handleLogout}>Logout</button></li>
                        <li className="username">{localStorage.getItem('username')}</li>
                    </>
                ) : (
                    <li><Link to="/">Login/Register</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;