import React, { useEffect } from 'react';
import { AbsoluteFill, Sequence, staticFile } from 'remotion';
import { preloadImage } from '@remotion/preload';
import { CinematicBg } from '../shared/cinematic-bg';
import { KineticType } from '../shared/kinetic-type';
import { BrandMark } from '../shared/brand';
import { CodePanel } from '../shared/code-panel';
import { CameraMotionBlur } from '@remotion/motion-blur';

const codeLines = [
  'const proof = new ProofClient({',
  '  apiKey: "pk_live_8923..."',
  '});',
  '',
  '// Create escrow (Streamflow)',
  'const escrow = await proof.escrow.create({',
  '  buyer: "7s...Qp",',
  '  seller: "9c...kD",',
  '  amount: 5000,',
  '  token: "USDC",',
  '  inspection: "72h"',
  '});',
  '',
  '// Subscribe to events',
  'proof.events.subscribe({',
  '  webhook: "https://api.yourapp.com/proof"',
  '});',
  '',
  'return escrow.status; // "LOCKED"',
];

export const ProofDevApiSquare: React.FC = () => {
  useEffect(() => {
    preloadImage(staticFile('/remotion-assets/proof/proof-mark.png'));
    preloadImage(staticFile('/remotion-assets/brands/solana.png'));
    preloadImage(staticFile('/remotion-assets/brands/usdc.png'));
  }, []);

  return (
    <AbsoluteFill>
      <CinematicBg intensity={0.92} />

      {/* Header */}
      <div style={{ position: 'absolute', top: 56, left: 56, right: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={staticFile('/remotion-assets/proof/proof-mark.png')} alt="Proof logo" style={{ width: 52, height: 52 }} />
          <div style={{ fontWeight: 950, letterSpacing: '-0.04em', fontSize: 26, color: '#0b1220' }}>PROOF</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <BrandMark size={56} src={staticFile('/remotion-assets/brands/solana.png')} alt="Solana" glow />
          <BrandMark size={56} src={staticFile('/remotion-assets/brands/usdc.png')} alt="USDC" />
        </div>
      </div>

      <Sequence from={0} durationInFrames={120}>
        <div style={{ position: 'absolute', top: 178, left: 56, right: 56 }}>
          <KineticType text="Developer API\nthat feels expensive." from={0} size={82} maxWidth={980} />
          <div style={{ marginTop: 18, fontSize: 22, fontWeight: 800, color: 'rgba(15,23,42,0.72)' }}>
            Create escrow. Track events. Settle on-chain.
          </div>
        </div>
      </Sequence>

      <CameraMotionBlur samples={10} shutterAngle={210}>
        <div style={{ position: 'absolute', left: 56, right: 56, bottom: 56, display: 'flex', justifyContent: 'center' }}>
          <CodePanel from={26} title="proof-sdk.ts" lines={codeLines} width={968} height={520} />
        </div>
      </CameraMotionBlur>
    </AbsoluteFill>
  );
};

