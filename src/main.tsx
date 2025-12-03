import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AnimationProvider } from './context/AnimationContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimationProvider>
        <App />
      </AnimationProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
