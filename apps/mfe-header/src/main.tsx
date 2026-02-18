import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Standalone entry — only used when running mfe-header independently
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App onRefreshAll={() => console.log('refreshAll (standalone noop)')} />
  </React.StrictMode>
);
