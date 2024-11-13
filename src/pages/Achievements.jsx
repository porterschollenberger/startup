import React, { useState } from 'react';
import { achievements } from './achievementsData';
import './Achievements.css';

function AchievementItem({ title, description, unlocked }) {
    return (
        <div className={`achievement ${unlocked ? '' : 'locked'}`}>
            <img src="/achievement.png?height=50&width=50" alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

function Achievements() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAchievements = achievements.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    const totalAchievements = achievements.reduce((acc, category) => acc + category.items.length, 0);
    const unlockedAchievements = achievements.reduce((acc, category) =>
        acc + category.items.filter(item => item.unlocked).length, 0);

    return (
        <main className="achievement-page">
            <h1 className="achievements-title">Achievements</h1>
            <div className="achievements-summary">
                <p>Progress: {unlockedAchievements} / {totalAchievements}</p>
                <progress value={unlockedAchievements} max={totalAchievements}></progress>
            </div>
            <input
                type="text"
                placeholder="Search achievements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="achievement-search"
            />
            {filteredAchievements.map(category => (
                <div key={category.category}>
                    <h2>{category.category}</h2>
                    <div className="achievements-grid">
                        {category.items.map(item => (
                            <AchievementItem key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            ))}
        </main>
    );
}

export default Achievements;