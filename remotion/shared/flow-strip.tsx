import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CameraMotionBlur } from '@remotion/motion-blur';
import { easeInOutCubic } from './easing';

type Step = {
  label: string;
  accent: 'blue' | 'teal';
};

type FlowStripProps = {
  from: number;
  steps: Step[];
  width: number;
};

export const FlowStrip: React.FC<FlowStripProps> = ({ from, steps, width }) => {
  const frame = useCurrentFrame();

  const p = interpolate(frame, [from, from + 44], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeInOutCubic,
  });

  const x = (1 - p) * 36;
  const opacity = p;

  return (
    <CameraMotionBlur samples={8} shutterAngle={180}>
      <div
        style={{
          width,
          display: 'flex',
          gap: 14,
          alignItems: 'center',
          padding: '14px 16px',
          borderRadius: 18,
          border: '1px solid rgba(15, 23, 42, 0.10)',
          background: 'rgba(255,255,255,0.72)',
          boxShadow: '0 28px 90px rgba(2,6,23,0.12)',
          transform: `translateX(${x}px)`,
          opacity,
          backdropFilter: 'blur(10px)',
        }}
      >
        {steps.map((s, idx) => {
          const accent = s.accent === 'blue' ? '#3b82f6' : '#14b8a6';
          return (
            <React.Fragment key={s.label}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), ${accent})`,
                    boxShadow: `0 10px 30px ${accent}33`,
                  }}
                />
                <div style={{ fontWeight: 800, fontSize: 14, color: '#0b1220' }}>{s.label}</div>
              </div>
              {idx < steps.length - 1 ? (
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background:
                      'linear-gradient(90deg, rgba(15,23,42,0.10), rgba(15,23,42,0.04), rgba(15,23,42,0.10))',
                  }}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </div>
    </CameraMotionBlur>
  );
};

