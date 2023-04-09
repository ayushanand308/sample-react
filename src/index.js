import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; //we are importing the "App" and then injecting it to the dom

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
