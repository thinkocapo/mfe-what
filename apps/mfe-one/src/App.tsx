import React from 'react';

interface Props {
  onRefresh?: (name: string) => void;
}

const remotes = [
  { key: 'header', label: 'HEADER', color: '#4ade80' },
  { key: 'two',    label: 'TWO',    color: '#f472b6' },
  { key: 'three',  label: 'THREE',  color: '#fb923c' },
  { key: 'four',   label: 'FOUR',   color: '#a78bfa' },
];

function MfeOne({ onRefresh }: Props) {
  return (
    <div>
      <div style={{ fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
        microfrontend
      </div>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '14px' }}>
        ONE — Controls
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {remotes.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => onRefresh?.(key)}
            style={{
              background: 'transparent',
              border: `1px solid ${color}`,
              color: color,
              padding: '6px 14px',
              fontFamily: "'Courier New', monospace",
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '12px',
              letterSpacing: '0.05em',
            }}
          >
            ↺ reload {label} mfe
          </button>
        ))}
      </div>
    </div>
  );
}

export default MfeOne;
