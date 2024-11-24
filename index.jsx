import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';
import {AuthProvider} from "./src/AuthContext";
import {GameProvider} from "./src/GameContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
      <GameProvider>
          <App />
      </GameProvider>
  </AuthProvider>
);