import React, { useState, useEffect, useRef } from 'react';
import './Ticker.css';

function Ticker() {
    const [fact, setFact] = useState('Loading a random fact...');
    const tickerRef = useRef(null);

    const fetchFact = async () => {
        try {
            const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
            if (!response.ok) {
                throw new Error('Failed to fetch fact');
            }
            const data = await response.json();
            return data.text;
        } catch (error) {
            console.error('Error fetching fact:', error);
            return 'Failed to load a random fact. Please try again later.';
        }
    };

    useEffect(() => {
        const updateFact = async () => {
            const newFact = await fetchFact();
            setFact(newFact);
        };

        updateFact();

        const tickerElement = tickerRef.current;
        if (tickerElement) {
            tickerElement.addEventListener('animationiteration', updateFact);
        }

        return () => {
            if (tickerElement) {
                tickerElement.removeEventListener('animationiteration', updateFact);
            }
        };
    }, []);

    return (
        <div className="ticker">
            <p ref={tickerRef}>{fact}</p>
        </div>
    );
}

export default Ticker;