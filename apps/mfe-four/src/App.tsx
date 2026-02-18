import React, { useState } from 'react';

const color = '#a78bfa';

const items = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'];

function MfeFour() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [mountedAt] = useState(() => new Date().toLocaleTimeString());

  const toggle = (item: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  return (
    <div>
      <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
        microfrontend
      </div>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color, marginBottom: '14px' }}>
        FOUR — Selector
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
        {items.map(item => {
          const active = selected.has(item);
          return (
            <button
              key={item}
              onClick={() => toggle(item)}
              style={{
                background: active ? color : 'transparent',
                border: `1px solid ${color}`,
                color: active ? '#0a0a0a' : color,
                padding: '5px 10px',
                fontFamily: "'Courier New', monospace",
                cursor: 'pointer',
                fontSize: '11px',
                transition: 'background 0.1s',
              }}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div style={{ fontSize: '11px', color: '#6b7280' }}>
        selected: {selected.size === 0 ? 'none' : [...selected].join(', ')}
      </div>

      <div style={{ fontSize: '10px', color: '#4b5563', marginTop: '8px' }}>
        mounted at {mountedAt}
      </div>
    </div>
  );
}

export default MfeFour;
