import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Home.css';

function Home() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('/api/check', { credentials: 'include' });
                const data = await response.json();
                if (data.authenticated) {
                    navigate('/play');
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };
        checkAuthentication();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setAuth({ isLoggedIn: true, username: data.username });
                    navigate('/play');
                } else {
                    const errorData = await response.json();
                    alert(errorData.msg || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login');
            }
        } else {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                    }),
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setAuth({ isLoggedIn: true, username: data.username });
                    navigate('/play');
                } else {
                    const errorData = await response.json();
                    alert(errorData.msg || 'Registration failed');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('An error occurred during registration');
            }
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <main className="home-page">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </>
                )}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                {!isLogin && (
                    <>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </>
                )}
                <input type="submit" value={isLogin ? 'Login' : 'Register'} />
            </form>
            <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={toggleForm} className="toggle-form">
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </main>
    );
}

export default Home;