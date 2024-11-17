import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Play.css';

function Play() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [money, setMoney] = useState(1);
    const [moneyPerTick, setMoneyPerTick] = useState(0);
    const [moneyMultiplier, setMoneyMultiplier] = useState(1);
    const [ticksPerSecond, setTicksPerSecond] = useState(1);
    const [isGameLoaded, setIsGameLoaded] = useState(false);
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

    const gameStateRef = useRef({});

    const loadGameState = async (username) => {
        try {
            const response = await fetch(`/api/game/${username}`);
            if (response.status === 200) {
                return await response.json();
            } else if (response.status === 201) {
                return {
                    money: money,
                    moneyPerTick: moneyPerTick,
                    moneyMultiplier: moneyMultiplier,
                    ticksPerSecond: ticksPerSecond,
                    items: items,
                };
            } else if (response.status === 401) {
                navigate('/');
            }
        } catch (error) {
            console.error('Failed to load game state:', error);
        }
        return null;
    };

    useEffect(() => {
        const fetchGameState = async () => {
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
                const savedState = await loadGameState(storedUsername);
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
        };
        fetchGameState();
    }, [navigate]);

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
                const newItems = {...prevItems};
                newItems[category][index] = {
                    ...item,
                    owned: item.owned + 1,
                };
                return newItems;
            });
            if (category === 'rags') {
                setMoneyPerTick(prevMoney => prevMoney + item.moneyPerTick);
            } else if (category === 'soaps') {
                setMoneyMultiplier(prevMultiplier => prevMultiplier + item.multiplierIncrease);
            } else if (category === 'workers') {
                setTicksPerSecond(prevTicks => prevTicks + item.tickIncrease);
            }
            setAnimatingItems(prev => ({ ...prev, [`${category}-${index}`]: 'success' }));
            setTimeout(() => {
                setAnimatingItems(prev => ({ ...prev, [`${category}-${index}`]: null }));
            }, 500);
        } else {
            setAnimatingItems(prev => ({ ...prev, [`${category}-${index}`]: 'fail' }));
            setTimeout(() => {
                setAnimatingItems(prev => ({ ...prev, [`${category}-${index}`]: null }));
            }, 500);
        }
    };

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    useEffect(() => {
        gameStateRef.current = {
            money,
            moneyPerTick,
            moneyMultiplier,
            ticksPerSecond,
            items,
        };
    }, [money, moneyPerTick, moneyMultiplier, ticksPerSecond, items]);

    const saveGameState = useCallback(() => {
        if (!isGameLoaded) {
            console.log("Game not yet loaded, skipping save");
            return;
        }
        console.log("Saving game to server");
        const currentGameState = gameStateRef.current;
        fetch('/api/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, gameState: currentGameState }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save game state');
                }
                console.log("Game state saved successfully");
            })
            .catch(error => {
                console.error('Error saving game state:', error);
            });
    }, [isGameLoaded, username]);

    useEffect(() => {
        if (isGameLoaded) {
            const saveInterval = setInterval(saveGameState, 60000); // Save every minute
            return () => {
                clearInterval(saveInterval);
                saveGameState(); // Save on component unmount
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
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
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
                                {category === 'soaps' && `${moneyMultiplier.toFixed(2)}x money multiplier`}
                                {category === 'workers' && `${ticksPerSecond.toFixed(1)} ticks per second`}
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
                                <img src={`/${item.name.toLowerCase().replace(/ /g, '_')}.jpeg?height=80&width=80`} alt={item.name} draggable="false"/>
                                <h3>{item.name}</h3>
                                <p>
                                    {category === 'rags' && `Earn ${formatMoney(item.moneyPerTick)} every tick`}
                                    {category === 'soaps' && `Increase earning multiplier by ${(item.multiplierIncrease * 100).toFixed(1)}%`}
                                    {category === 'workers' && `Increase ticks/second by ${item.tickIncrease}`}
                                </p>
                                <p className="price">{formatMoney(Math.floor(item.basePrice * Math.pow(1.15, item.owned)))}</p>
                                <p className="owned">You have: {item.owned}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Play;