import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { easeOutCubic } from './easing';

type KineticTypeProps = {
  text: string;
  from: number;
  inFrames?: number;
  outFrames?: number;
  size: number;
  weight?: number;
  color?: string;
  letterSpacing?: number;
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
};

export const KineticType: React.FC<KineticTypeProps> = ({
  text,
  from,
  inFrames = 14,
  outFrames = 12,
  size,
  weight = 900,
  color = '#0b1220',
  letterSpacing = -0.02,
  maxWidth,
  align = 'left',
}) => {
  const frame = useCurrentFrame();
  const tIn = interpolate(frame, [from, from + inFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutCubic,
  });

  const tOut = interpolate(frame, [from + inFrames, from + inFrames + outFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOutCubic,
  });

  const y = (1 - tIn) * 18 + tOut * -10;
  const blur = (1 - tIn) * 10 + tOut * 2;
  const opacity = tIn * (1 - tOut);
  const scale = 0.98 + tIn * 0.02 - tOut * 0.01;

  return (
    <div
      style={{
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing: `${letterSpacing}em`,
        lineHeight: 1.02,
        textAlign: align,
        maxWidth,
        transform: `translateY(${y}px) scale(${scale})`,
        filter: `blur(${blur}px)`,
        opacity,
        textShadow: '0 16px 70px rgba(15, 23, 42, 0.10)',
        whiteSpace: 'pre-wrap',
      }}
    >
      {text}
    </div>
  );
};

