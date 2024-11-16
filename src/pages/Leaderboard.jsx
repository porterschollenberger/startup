import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const fetchLeaderboardData = async () => {
    try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
            throw new Error('Failed to fetch leaderboard data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        return [];
    }
};

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const loadLeaderboardData = async () => {
            const data = await fetchLeaderboardData();
            setLeaderboardData(data);
        };
        loadLeaderboardData();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const updatedData = await fetchLeaderboardData();
            setLeaderboardData(updatedData);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const handlePrevious = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage(prev => Math.min(prev + 1, Math.ceil(leaderboardData.length / itemsPerPage)));
    };

    const currentData = leaderboardData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getPlaceClass = (index) => {
        const overallRank = (currentPage - 1) * itemsPerPage + index + 1;
        if (overallRank === 1) return 'first-place';
        if (overallRank === 2) return 'second-place';
        if (overallRank === 3) return 'third-place';
        return '';
    };

    return (
        <main className="leaderboard-page">
            <h1 className="leaderboard-title">Leaderboard</h1>
            <ol className="leaderboard">
                {currentData.map((player, index) => (
                    <li key={player.username} className={`leaderboard-item ${getPlaceClass(index)}`}>
                        <span className="rank">{(currentPage - 1) * itemsPerPage + index + 1}</span>
                        <span className="player-name">{player.username}</span>
                        <span className="player-money">{formatMoney(player.money)}</span>
                    </li>
                ))}
            </ol>
            <div className="pagination">
                <button onClick={handlePrevious} disabled={currentPage === 1}>&lt; Previous</button>
                <span>Page {currentPage} of {Math.ceil(leaderboardData.length / itemsPerPage)}</span>
                <button onClick={handleNext}
                        disabled={currentPage === Math.ceil(leaderboardData.length / itemsPerPage)}>Next &gt;</button>
            </div>
        </main>
    );
}

export default Leaderboard;