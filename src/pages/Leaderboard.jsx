import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const generateMockData = (count) => {
    const names = ['Jason', 'Mark', 'Hunter', 'Emma', 'Olivia', 'Liam', 'Sophia', 'Noah', 'Ava', 'Ethan',
        'Charlotte', 'William', 'Amelia', 'James', 'Mia', 'Benjamin', 'Harper', 'Lucas', 'Evelyn', 'Mason'];
    const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
        'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`,
        money: Math.floor(Math.random() * 10000) + 1000
    })).sort((a, b) => b.money - a.money);
};

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const mockData = generateMockData(100);
        setLeaderboardData(mockData);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setLeaderboardData(prevData => {
                const updatedData = prevData.map(player => ({
                    ...player,
                    money: player.money + Math.floor(Math.random() * 100000)
                }));
                return updatedData.sort((a, b) => b.money - a.money);
            });
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
                    <li key={player.id} className={`leaderboard-item ${getPlaceClass(index)}`}>
                        <span className="rank">{(currentPage - 1) * itemsPerPage + index + 1}</span>
                        <span className="player-name">{player.name}</span>
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