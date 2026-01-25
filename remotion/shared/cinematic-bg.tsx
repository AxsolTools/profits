import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { createNoise3D } from 'simplex-noise';

const noise3D = createNoise3D();

type CinematicBgProps = {
  intensity?: number; // 0..1
};

export const CinematicBg: React.FC<CinematicBgProps> = ({ intensity = 0.9 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const lines = useMemo(() => {
    const count = Math.max(28, Math.round(width / 48));
    return new Array(count).fill(0).map((_, i) => ({
      id: i,
      x: (width / (count - 1)) * i,
      speed: 0.001 + Math.random() * 0.0006,
      color: i % 2 === 0 ? '#3b82f6' : '#14b8a6',
      strokeWidth: 0.6 + Math.random() * 1.2,
    }));
  }, [width]);

  const paths = lines.map((line) => {
    let d = `M ${line.x} 0`;
    for (let y = 0; y <= height; y += 44) {
      const xOffset =
        noise3D(line.x * 0.001, y * 0.002, frame * line.speed) * (80 + 60 * intensity);
      d += ` L ${line.x + xOffset} ${y}`;
    }
    return (
      <path
        key={line.id}
        d={d}
        fill="none"
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        strokeOpacity={0.12 * intensity}
        style={{ mixBlendMode: 'multiply' as const }}
      />
    );
  });

  const orbA = 0.05 + Math.sin(frame * 0.012) * 0.015;
  const orbB = 0.05 + Math.cos(frame * 0.016) * 0.015;

  return (
    <AbsoluteFill>
      {/* Light “paper + glass” base */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(1200px 800px at 20% 20%, rgba(59,130,246,0.18), transparent 55%), radial-gradient(900px 700px at 80% 70%, rgba(20,184,166,0.14), transparent 60%), linear-gradient(180deg, #fbfdff 0%, #f4f7ff 55%, #eef6ff 100%)',
        }}
      />

      <AbsoluteFill style={{ opacity: 0.9 }}>
        <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
          {paths}
          <circle cx={width * 0.18} cy={height * 0.22} r={Math.min(width, height) * 0.42} fill="url(#orbA)" opacity={orbA * intensity} />
          <circle cx={width * 0.82} cy={height * 0.78} r={Math.min(width, height) * 0.36} fill="url(#orbB)" opacity={orbB * intensity} />
          <defs>
            <radialGradient id="orbA" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="orbB" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </AbsoluteFill>

      {/* Subtle grain */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27240%27 height=%27240%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27240%27 height=%27240%27 filter=%27url(%23n)%27 opacity=%270.16%27/%3E%3C/svg%3E")',
          opacity: 0.08 * intensity,
          mixBlendMode: 'multiply',
        }}
      />
    </AbsoluteFill>
  );
};

