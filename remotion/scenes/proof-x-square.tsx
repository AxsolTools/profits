import React, { useEffect } from 'react';
import { AbsoluteFill, staticFile } from 'remotion';
import { preloadImage } from '@remotion/preload';
import { CinematicBg } from '../shared/cinematic-bg';
import { KineticType } from '../shared/kinetic-type';
import { FlowStrip } from '../shared/flow-strip';
import { BrandMark } from '../shared/brand';

export const ProofXSquare: React.FC = () => {
  useEffect(() => {
    preloadImage(staticFile('/remotion-assets/proof/proof-mark.png'));
    preloadImage(staticFile('/remotion-assets/brands/solana.png'));
    preloadImage(staticFile('/remotion-assets/brands/usdc.png'));
  }, []);

  return (
    <AbsoluteFill>
      <CinematicBg intensity={0.95} />

      {/* Top-left Proof */}
      <div style={{ position: 'absolute', top: 56, left: 56, display: 'flex', alignItems: 'center', gap: 16 }}>
        <img
          src={staticFile('/remotion-assets/proof/proof-mark.png')}
          alt="Proof logo"
          style={{ width: 54, height: 54 }}
        />
        <div style={{ fontWeight: 950, letterSpacing: '-0.04em', fontSize: 26, color: '#0b1220' }}>PROOF</div>
      </div>

      {/* Hero copy */}
      <div style={{ position: 'absolute', left: 56, right: 56, top: 190 }}>
        <KineticType text="Trustless escrow\nthat settles itself." from={0} size={84} maxWidth={900} />
        <div style={{ marginTop: 18, fontSize: 22, fontWeight: 700, color: 'rgba(15,23,42,0.72)' }}>
          Lock funds. Verify delivery. Resolve disputes by governance.
        </div>
      </div>

      {/* Flow */}
      <div style={{ position: 'absolute', left: 56, right: 56, bottom: 148, display: 'flex', justifyContent: 'center' }}>
        <FlowStrip
          from={24}
          width={968}
          steps={[
            { label: 'Lock', accent: 'blue' },
            { label: 'Verify', accent: 'teal' },
            { label: 'Dispute', accent: 'blue' },
            { label: 'Vote', accent: 'teal' },
            { label: 'Settle', accent: 'blue' },
          ]}
        />
      </div>

      {/* Brand chips */}
      <div style={{ position: 'absolute', right: 56, top: 54, display: 'flex', gap: 12 }}>
        <BrandMark size={58} src={staticFile('/remotion-assets/brands/solana.png')} alt="Solana" glow />
        <BrandMark size={58} src={staticFile('/remotion-assets/brands/usdc.png')} alt="USDC" />
      </div>
    </AbsoluteFill>
  );
};

