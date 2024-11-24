import React, { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [isGameLoaded, setIsGameLoaded] = useState(false);
    const [username, setUsername] = useState('');
    const [gameState, setGameState] = useState({});

    const gameStateRef = useRef(gameState);

    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    const saveGameState = useCallback(() => {
        if (!isGameLoaded) {
            console.log('Game not yet loaded, skipping save');
            return;
        }
        console.log('Saving game state:', { username, gameState: gameStateRef.current });
        fetch('/api/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, gameState: gameStateRef.current }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to save game state');
                }
                console.log('Game state saved successfully');
            })
            .catch((error) => {
                console.error('Error saving game state:', error);
            });
    }, [isGameLoaded, username]);

    return (
        <GameContext.Provider value={{
            isGameLoaded, setIsGameLoaded, saveGameState, setUsername, setGameState
        }}>
            {children}
        </GameContext.Provider>
    );
};
