import React from 'react';

function Achievements() {
    return (
        <main>
            <h1 className="achievements-title">Achievements</h1>
            <div className="achievements-grid">
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Game Time Novice"/>
                    <h3>Game Time Novice</h3>
                    <p>Play the game for 10 minutes</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Game Time Amateur"/>
                    <h3>Game Time Amateur</h3>
                    <p>Play the game for 30 minutes</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Game Time Expert"/>
                    <h3>Game Time Expert</h3>
                    <p>Play the game for 1 hour</p>
                </div>
                <div className="achievement locked">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Game Time Professional"/>
                    <h3>Game Time Professional</h3>
                    <p>Play the game for 10 hours</p>
                </div>
                <div className="achievement locked">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Game Time Master"/>
                    <h3>Game Time Master</h3>
                    <p>Play the game for 100 hours</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Frequent Shopper Novice"/>
                    <h3>Frequent Shopper Novice</h3>
                    <p>Purchase 10 items from the store</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Frequent Shopper Amateur"/>
                    <h3>Frequent Shopper Amateur</h3>
                    <p>Purchase 100 items from the store</p>
                </div>
                <div className="achievement locked">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Frequent Shopper Expert"/>
                    <h3>Frequent Shopper Expert</h3>
                    <p>Purchase 1,000 items from the store</p>
                </div>
                <div className="achievement locked">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Frequent Shopper Professional"/>
                    <h3>Frequent Shopper Professional</h3>
                    <p>Purchase 5,000 items from the store</p>
                </div>
                <div className="achievement locked">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Frequent Shopper Master"/>
                    <h3>Frequent Shopper Master</h3>
                    <p>Purchase 10,000 items from the store</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Hundredaire"/>
                    <h3>Hundrenaire</h3>
                    <p>Earn $100</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Thousandaire"/>
                    <h3>Thousandaire</h3>
                    <p>Earn $1,000</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Millionaire"/>
                    <h3>Millionaire</h3>
                    <p>Earn $1,000,000</p>
                </div>
                <div className="achievement locked">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Billionaire"/>
                    <h3>Billionaire</h3>
                    <p>Earn $1,000,000,000</p>
                </div>
                <div className="achievement locked">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Trillionaire"/>
                    <h3>Trillionaire</h3>
                    <p>Earn $1,000,000,000,000</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Leaderboard Novice"/>
                    <h3>Leaderboard Climber Novice</h3>
                    <p>Reach top 100 on the leaderboard</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Leaderboard Amateur"/>
                    <h3>Leaderboard Climber Amateur</h3>
                    <p>Reach top 50 on the leaderboard</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Leaderboard Expert"/>
                    <h3>Leaderboard Climber Expert</h3>
                    <p>Reach top 10 on the leaderboard</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Leaderboard Professional"/>
                    <h3>Leaderboard Climber Professional</h3>
                    <p>Reach top 5 on the leaderboard</p>
                </div>
                <div className="achievement">
                    <img src="/assets/achievement.png?height=50&width=50" alt="Leaderboard Master"/>
                    <h3>Leaderboard Climber Master</h3>
                    <p>Reach rank #1 on the leaderboard</p>
                </div>
            </div>
        </main>
    );
}

export default Achievements;