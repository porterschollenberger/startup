import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Ticker from './components/Ticker';
import Footer from './components/Footer';
import Home from './pages/Home';
import Play from './pages/Play';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import './App.css';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/check', {
                    credentials: 'include'
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
    return (
      <Router>
          <div className="App">
              <Header />
              <Navigation />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/play" element={
                      <ProtectedRoute>
                          <Play />
                      </ProtectedRoute>
                  } />
                  <Route path="/leaderboard" element={
                      <ProtectedRoute>
                          <Leaderboard />
                      </ProtectedRoute>
                  } />
                  <Route path="/achievements" element={
                      <ProtectedRoute>
                          <Achievements />
                      </ProtectedRoute>
                  } />
              </Routes>
              <Ticker />
              <Footer />
          </div>
      </Router>
    );
}

export default App;