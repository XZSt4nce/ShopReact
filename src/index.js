import './index.css';
import './ui/Styles/GridTable.css';
import './ui/Styles/Rating.css';
import './ui/Styles/Button.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ui/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);