import React, { useState, useEffect } from 'react';

const color = '#fb923c';

function MfeThree() {
  const [mountedAt] = useState(() => Date.now());
  const [now, setNow] = useState(Date.now());
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [running]);

  const elapsed = Math.floor((now - mountedAt) / 1000);

  return (
    <div>
      <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
        microfrontend
      </div>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color, marginBottom: '14px' }}>
        THREE — Timer
      </div>

      <div style={{ fontSize: '40px', fontWeight: 'bold', color, lineHeight: 1, marginBottom: '4px' }}>
        {elapsed}s
      </div>
      <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '12px' }}>
        since mount
      </div>

      <button
        onClick={() => setRunning(r => !r)}
        style={{
          background: 'transparent',
          border: `1px solid ${color}`,
          color,
          padding: '5px 14px',
          fontFamily: "'Courier New', monospace",
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        {running ? '⏸ pause' : '▶ resume'}
      </button>

      <div style={{ fontSize: '10px', color: '#4b5563', marginTop: '10px' }}>
        mounted at {new Date(mountedAt).toLocaleTimeString()}
      </div>
    </div>
  );
}

export default MfeThree;
