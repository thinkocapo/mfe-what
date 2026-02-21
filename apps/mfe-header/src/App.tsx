import React, { useEffect } from 'react';

interface Props {
  onRefreshAll?: () => void;
}

const btn: React.CSSProperties = {
  background: '#4ade80',
  color: '#000',
  border: 'none',
  padding: '8px 20px',
  fontFamily: "'Courier New', monospace",
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '13px',
  letterSpacing: '0.05em',
};

function MfeHeader({ onRefreshAll }: Props) {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1');
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
      <div>
        <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          microfrontend
        </div>
        <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#4ade80', letterSpacing: '0.05em' }}>
          HEADER
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#9ca3af' }}>
        Shell: <span style={{ color: '#4ade80' }}>:4000</span>
        &nbsp;·&nbsp;
        Remotes: <span style={{ color: '#4ade80' }}>:4001–4005</span>
      </div>

      <button style={btn} onClick={onRefreshAll}>
        ↺ REFRESH ALL MFEs
      </button>
    </div>
  );
}

export default MfeHeader;
