import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Play from './pages/Play';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import './App.css';

function App() {
    return (
        <Router>
            <div className={"App"}>
                <Header />
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/play" element={<Play />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/achievements" element={<Achievements />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;