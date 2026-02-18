import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Standalone entry — only used when running mfe-one independently
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App onRefresh={(name) => console.log('refresh (standalone noop):', name)} />
  </React.StrictMode>
);
