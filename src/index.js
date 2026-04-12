import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import 'lenis/dist/lenis.css';
import './styles/tokens.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
