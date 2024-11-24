import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Navigation.css';

function Navigation() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/check', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setAuth({ isLoggedIn: data.authenticated, username: data.username });
            } else {
                setAuth({ isLoggedIn: false, username: '' });
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
            setAuth({ isLoggedIn: false, username: '' });
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setAuth({ isLoggedIn: false, username: '' });
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(errorData.msg || 'Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Logout failed');
        }
    };

    return (
      <nav>
          <i className="fa-solid fa-bars"></i>
          <ul className="nav-list">
              <li><Link to="/play">Play</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
              <li><Link to="/achievements">Achievements</Link></li>
          </ul>
          <ul className="account-info">
              {auth.isLoggedIn ? (
                <>
                    <li><button onClick={handleLogout}>Logout</button></li>
                    <li className="username">{auth.username}</li>
                </>
              ) : (
                <li><Link to="/">Login/Register</Link></li>
              )}
          </ul>
      </nav>
    );
}

export default Navigation;
