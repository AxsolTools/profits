import React from 'react';

type BrandMarkProps = {
  size: number;
  src: string;
  alt: string;
  glow?: boolean;
};

export const BrandMark: React.FC<BrandMarkProps> = ({ size, src, alt, glow }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.22),
        background: 'rgba(255,255,255,0.9)',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: glow
          ? '0 24px 80px rgba(59,130,246,0.18), 0 8px 24px rgba(20,184,166,0.14)'
          : '0 12px 40px rgba(2,6,23,0.10)',
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
      }}
    >
      <img src={src} alt={alt} style={{ width: size * 0.62, height: size * 0.62 }} />
    </div>
  );
};

