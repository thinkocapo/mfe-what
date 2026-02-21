import React, { useState, useEffect } from 'react';

const color = '#f472b6';

function MfeTwo() {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums/1');
  }, []);

  const [count, setCount] = useState(0);
  const [mountedAt] = useState(() => new Date().toLocaleTimeString());

  return (
    <div>
      <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
        microfrontend
      </div>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color, marginBottom: '14px' }}>
        TWO — Counter
      </div>

      <div style={{ fontSize: '48px', fontWeight: 'bold', color, lineHeight: 1, marginBottom: '10px' }}>
        {count}
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{ background: 'transparent', border: `1px solid ${color}`, color, padding: '4px 14px', fontFamily: "'Courier New', monospace", cursor: 'pointer', fontSize: '14px' }}
        >
          +
        </button>
        <button
          onClick={() => setCount(c => Math.max(0, c - 1))}
          style={{ background: 'transparent', border: `1px solid ${color}`, color, padding: '4px 14px', fontFamily: "'Courier New', monospace", cursor: 'pointer', fontSize: '14px' }}
        >
          −
        </button>
        <button
          onClick={() => setCount(0)}
          style={{ background: 'transparent', border: `1px solid #374151`, color: '#6b7280', padding: '4px 14px', fontFamily: "'Courier New', monospace", cursor: 'pointer', fontSize: '11px' }}
        >
          reset
        </button>
      </div>

      <div style={{ fontSize: '10px', color: '#4b5563', marginTop: '10px' }}>
        mounted at {mountedAt}
      </div>
    </div>
  );
}

export default MfeTwo;
