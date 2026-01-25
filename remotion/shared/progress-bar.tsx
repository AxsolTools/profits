import React from 'react';

export const ProgressBar: React.FC<{ value: number; accent: 'blue' | 'teal' }> = ({ value, accent }) => {
  const clamped = Math.max(0, Math.min(100, value));
  const from = accent === 'blue' ? 'rgba(59,130,246,0.95)' : 'rgba(20,184,166,0.95)';
  const to = accent === 'blue' ? 'rgba(125,211,252,0.95)' : 'rgba(94,234,212,0.95)';

  return (
    <div
      style={{
        height: 10,
        borderRadius: 999,
        background: 'rgba(15,23,42,0.08)',
        overflow: 'hidden',
        border: '1px solid rgba(15,23,42,0.08)',
      }}
    >
      <div
        style={{
          width: `${clamped}%`,
          height: '100%',
          borderRadius: 999,
          background: `linear-gradient(90deg, ${from}, ${to})`,
          boxShadow: accent === 'blue' ? '0 0 18px rgba(59,130,246,0.22)' : '0 0 18px rgba(20,184,166,0.22)',
        }}
      />
    </div>
  );
};

