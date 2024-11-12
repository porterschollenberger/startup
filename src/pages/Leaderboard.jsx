import React from 'react';
import './Leaderboard.css';

function Leaderboard() {
    return (
        <main className="leaderboard-page">
            <h1 className="leaderboard-title">Leaderboard</h1>
            <ol className="leaderboard">
                <li className="leaderboard-item">
                    <span className="rank">1</span>
                    <span className="player-name">Jason Smith</span>
                    <span className="player-money">$1,000,000</span>
                </li>
                <li className="leaderboard-item">
                    <span className="rank">2</span>
                    <span className="player-name">Mark Hubert</span>
                    <span className="player-money">$750,000</span>
                </li>
                <li className="leaderboard-item">
                    <span className="rank">3</span>
                    <span className="player-name">Hunter Garth</span>
                    <span className="player-money">$500,000</span>
                </li>
                <li className="leaderboard-item">
                    <span className="rank">4</span>
                    <span className="player-name">Emma Johnson</span>
                    <span className="player-money">$250,000</span>
                </li>
                <li className="leaderboard-item">
                    <span className="rank">5</span>
                    <span className="player-name">Olivia Davis</span>
                    <span className="player-money">$100,000</span>
                </li>
                <li className="leaderboard-item">
                    <span className="rank">6</span>
                    <span className="player-name">Liam Wilson</span>
                    <span className="player-money">$75,000</span>
                </li>
                <li className="leaderboard-item">
                    <span className="rank">7</span>
                    <span className="player-name">Sophia Brown</span>
                    <span className="player-money">$50,000</span>
                </li>
                <li className="leaderboard-item">
                    <span className="rank">8</span>
                    <span className="player-name">Noah Taylor</span>
                    <span className="player-money">$25,000</span>
                </li>
                <li className="leaderboard-item">
                    <span className="rank">9</span>
                    <span className="player-name">Ava Anderson</span>
                    <span className="player-money">$10,000</span>
                </li>
                <li className="leaderboard-item">
                    <span className="rank">10</span>
                    <span className="player-name">Ethan Martinez</span>
                    <span className="player-money">$5,000</span>
                </li>
            </ol>
            <div className="pagination">
                <button>&lt; Previous</button>
                <button>Next &gt;</button>
            </div>
        </main>
    );
}

export default Leaderboard;