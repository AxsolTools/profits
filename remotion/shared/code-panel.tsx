import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

type CodePanelProps = {
  from: number;
  title: string;
  lines: string[];
  width: number;
  height: number;
};

export const CodePanel: React.FC<CodePanelProps> = ({ from, title, lines, width, height }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [from, from + 110], [0, lines.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const activeLineIndex = Math.floor(progress);

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 22,
        border: '1px solid rgba(15,23,42,0.10)',
        background: 'rgba(15,23,42,0.92)',
        boxShadow: '0 40px 120px rgba(2,6,23,0.22)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
          background: 'rgba(2,6,23,0.55)',
          borderBottom: '1px solid rgba(148,163,184,0.12)',
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#ff5f56' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#ffbd2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#27c93f' }} />
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(226,232,240,0.70)' }}>{title}</div>
        <div style={{ width: 42 }} />
      </div>

      {/* Content */}
      <div style={{ padding: 16, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 12,
            width: 26,
            textAlign: 'right',
            color: 'rgba(148,163,184,0.50)',
            fontSize: 11,
            lineHeight: '22px',
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            userSelect: 'none',
          }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <div
          style={{
            marginLeft: 36,
            fontSize: 13,
            lineHeight: '22px',
            color: 'rgba(226,232,240,0.90)',
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
        >
          {lines.map((line, i) => {
            const visible = i < progress;
            const isActive = i === activeLineIndex;
            return (
              <div
                key={i}
                style={{
                  height: 22,
                  display: 'flex',
                  alignItems: 'center',
                  opacity: visible ? 1 : 0,
                  background: isActive ? 'rgba(59,130,246,0.10)' : 'transparent',
                  borderRadius: 10,
                  paddingLeft: 10,
                  marginLeft: -10,
                  paddingRight: 10,
                  marginRight: 10,
                  transition: 'opacity 120ms linear',
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: highlight(line) }} />
                {isActive ? (
                  <span
                    style={{
                      width: 8,
                      height: 14,
                      background: '#60a5fa',
                      marginLeft: 6,
                      opacity: 0.9,
                      animation: 'blink 900ms infinite',
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <style>
        {`@keyframes blink { 0%, 49% { opacity: 0.0; } 50%, 100% { opacity: 1.0; } }`}
      </style>
    </div>
  );
};

function highlight(code: string) {
  return code
    .replace(/(const|await|new|return)/g, '<span style="color:#FF7B72;font-weight:800;">$1</span>')
    .replace(/(ProofClient|proof|escrow|webhook|events)/g, '<span style="color:#79C0FF;font-weight:800;">$1</span>')
    .replace(/(create|subscribe|on)/g, '<span style="color:#D2A8FF;font-weight:800;">$1</span>')
    .replace(/"(.*?)"/g, (match) => `<span style="color:#A5D6FF;">${match}</span>`)
    .replace(/(\d+)/g, '<span style="color:#7dd3fc;font-weight:800;">$1</span>')
    .replace(/(\/\/.*)/g, '<span style="color:#8B949E;font-style:italic;">$1</span>');
}

