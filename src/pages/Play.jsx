import React, { useState, useEffect, useCallback } from 'react';
import './Play.css';

function Play() {
    const loadGameState = () => {
        const savedState = localStorage.getItem('gameState');
        if (savedState) {
            return JSON.parse(savedState);
        }
        return null;
    }

    const [money, setMoney] = useState(() => {
        const savedState = loadGameState();
        return savedState ? savedState.money : 1;
    });
    const [moneyPerTick, setMoneyPerTick] = useState(() => {
        const savedState = loadGameState();
        return savedState ? savedState.moneyPerTick : 0;
    });
    const [moneyMultiplier, setMoneyMultiplier] = useState(() => {
        const savedState = loadGameState();
        return savedState ? savedState.moneyMultiplier : 1;
    });
    const [ticksPerSecond, setTicksPerSecond] = useState(() => {
        const savedState = loadGameState();
        return savedState ? savedState.ticksPerSecond : 1;
    });

    const [items, setItems] = useState(() => {
        const savedState = loadGameState();
        return savedState ? savedState.items : {
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
        }
    });

    const [animatingItems, setAnimatingItems] = useState({});

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

    const saveGameState = () => {
      const gameState = { money, moneyPerTick, moneyMultiplier, ticksPerSecond, items };
      localStorage.setItem('gameState', JSON.stringify(gameState));
    };

    useEffect(() => {
        saveGameState();
    }, [money, moneyPerTick, moneyMultiplier, ticksPerSecond, items]);

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