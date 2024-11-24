import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../GameContext';
import './Play.css';

function Play() {
    const navigate = useNavigate();
    const { isGameLoaded, setIsGameLoaded, saveGameState, setUsername, setGameState } = useGame();
    const [money, setMoney] = useState(1);
    const [moneyPerTick, setMoneyPerTick] = useState(0);
    const [moneyMultiplier, setMoneyMultiplier] = useState(1);
    const [ticksPerSecond, setTicksPerSecond] = useState(1);
    const [items, setItems] = useState({
        rags: [
            {name: "Old Rag", basePrice: 1, owned: 0, moneyPerTick: 0.30},
            {name: "Basic Rag", basePrice: 15, owned: 0, moneyPerTick: 1},
            {name: "High Quality Rag", basePrice: 50, owned: 0, moneyPerTick: 5},
            {name: "Super Rag", basePrice: 5000, owned: 0, moneyPerTick: 100},
        ],
        soaps: [
            {name: "Watery Soap", basePrice: 5, owned: 0, multiplierIncrease: 0.001},
            {name: "Basic Soap", basePrice: 50, owned: 0, multiplierIncrease: 0.01},
            {name: "High Quality Soap", basePrice: 115, owned: 0, multiplierIncrease: 0.05},
            {name: "Super Soap", basePrice: 250000, owned: 0, multiplierIncrease: 1},
        ],
        workers: [
            {name: "Lazy Worker", basePrice: 100, owned: 0, tickIncrease: 0.2},
            {name: "Basic Worker", basePrice: 500, owned: 0, tickIncrease: 1},
            {name: "Hard Worker", basePrice: 100000, owned: 0, tickIncrease: 50},
            {name: "Super Worker", basePrice: 350000000, owned: 0, tickIncrease: 1000},
        ],
    });
    const [animatingItems, setAnimatingItems] = useState({});

    const loadGameState = async (username) => {
        try {
            const response = await fetch(`/api/game/${username}`);
            if (response.status === 200) {
                return await response.json();
            }
            if (response.status === 201) {
                return {
                    money,
                    moneyPerTick,
                    moneyMultiplier,
                    ticksPerSecond,
                    items,
                };
            }
        } catch (error) {
            console.error('Failed to load game state:', error);
        }
        return null;
    };

    useEffect(() => {
        const fetchGameState = async () => {
            try {
                const response = await fetch('/api/check', { credentials: 'include' });
                if (response.ok) {
                    const data = await response.json();
                    if (data.authenticated) {
                        setUsername(data.username);
                        const savedState = await loadGameState(data.username);
                        if (savedState) {
                            setMoney(savedState.money);
                            setMoneyPerTick(savedState.moneyPerTick);
                            setMoneyMultiplier(savedState.moneyMultiplier);
                            setTicksPerSecond(savedState.ticksPerSecond);
                            setItems(savedState.items);
                        }
                        setIsGameLoaded(true);
                    } else {
                        navigate('/');
                    }
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                navigate('/');
            }
        };
        fetchGameState();
    }, [navigate, setIsGameLoaded]);

    const updateMoney = useCallback(() => {
        setMoney(prevMoney => prevMoney + moneyPerTick * moneyMultiplier);
    }, [moneyPerTick, moneyMultiplier]);

    useEffect(() => {
        const interval = setInterval(updateMoney, 1000 / ticksPerSecond);
        return () => clearInterval(interval);
    }, [updateMoney, ticksPerSecond]);

    const buyItem = (category, index) => {
        const item = items[category][index];
        const price = Math.floor(item.basePrice * Math.pow(1.15, item.owned));
        if (money >= price) {
            setMoney(prevMoney => prevMoney - price);
            setItems(prevItems => {
                const newItems = { ...prevItems };
                newItems[category][index] = {
                    ...item,
                    owned: item.owned + 1,
                };
                return newItems;
            });
            if (category === 'rags') {
                setMoneyPerTick(prev => prev + item.moneyPerTick);
            } else if (category === 'soaps') {
                setMoneyMultiplier(prev => prev + item.multiplierIncrease);
            } else if (category === 'workers') {
                setTicksPerSecond(prev => prev + item.tickIncrease);
            }
            animatePurchase(category, index, 'success');
        } else {
            animatePurchase(category, index, 'fail');
        }
    };

    const animatePurchase = (category, index, result) => {
        setAnimatingItems(prev => ({ ...prev, [`${category}-${index}`]: result }));
        setTimeout(() => {
            setAnimatingItems(prev => ({ ...prev, [`${category}-${index}`]: null }));
        }, 500);
    };

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    useEffect(() => {
        setGameState({
            money,
            moneyPerTick,
            moneyMultiplier,
            ticksPerSecond,
            items,
        });
    }, [money, moneyPerTick, moneyMultiplier, ticksPerSecond, items]);

    useEffect(() => {
        if (isGameLoaded) {
            const saveInterval = setInterval(saveGameState, 60000);
            return () => {
                clearInterval(saveInterval);
                saveGameState();
            };
        }
    }, [isGameLoaded, saveGameState]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (isGameLoaded) {
                saveGameState();
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isGameLoaded, saveGameState]);

    return (
        <main className="play-page">
            <div className="money-display">{formatMoney(money)}</div>
            <div className="items-container">
                {Object.entries(items).map(([category, categoryItems]) => (
                    <div key={category} className="item-column">
                        <div className="column-header">
                            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                            <p className="subtext">
                                {category === 'rags' && `${formatMoney(moneyPerTick)} per tick`}
                                {category === 'soaps' && `${moneyMultiplier.toFixed(2)}x multiplier`}
                                {category === 'workers' && `${ticksPerSecond.toFixed(1)} ticks/sec`}
                            </p>
                        </div>
                        {categoryItems.map((item, index) => (
                            <div
                                key={item.name}
                                className={`item-card ${
                                    animatingItems[`${category}-${index}`] === 'success' ? 'purchase-success' :
                                        animatingItems[`${category}-${index}`] === 'fail' ? 'purchase-fail' : ''
                                }`}
                                onClick={() => buyItem(category, index)}
                            >
                                <img
                                    src={`/${item.name.toLowerCase().replace(/ /g, '_')}.jpeg?height=80&width=80`}
                                    alt={item.name}
                                    draggable="false"
                                />
                                <h3>{item.name}</h3>
                                <p>
                                    {category === 'rags' && `Earn ${formatMoney(item.moneyPerTick)} per tick`}
                                    {category === 'soaps' && `Boost multiplier by ${(item.multiplierIncrease * 100).toFixed(1)}%`}
                                    {category === 'workers' && `Boost ticks/sec by ${item.tickIncrease}`}
                                </p>
                                <p className="price">{formatMoney(Math.floor(item.basePrice * Math.pow(1.15, item.owned)))}</p>
                                <p className="owned">You own: {item.owned}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Play;
