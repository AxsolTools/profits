import React, { useEffect } from 'react';
import { AbsoluteFill, Sequence, staticFile } from 'remotion';
import { preloadImage } from '@remotion/preload';
import { CinematicBg } from '../shared/cinematic-bg';
import { KineticType } from '../shared/kinetic-type';
import { FlowStrip } from '../shared/flow-strip';
import { BrandMark } from '../shared/brand';

export const ProofVerticalShort: React.FC = () => {
  useEffect(() => {
    preloadImage(staticFile('/remotion-assets/proof/proof-mark.png'));
    preloadImage(staticFile('/remotion-assets/brands/solana.png'));
    preloadImage(staticFile('/remotion-assets/brands/usdc.png'));
    preloadImage(staticFile('/remotion-assets/brands/usdt.svg'));
  }, []);

  return (
    <AbsoluteFill>
      <CinematicBg intensity={1} />

      {/* Header */}
      <div style={{ position: 'absolute', top: 64, left: 56, right: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={staticFile('/remotion-assets/proof/proof-mark.png')} alt="Proof logo" style={{ width: 52, height: 52 }} />
          <div style={{ fontWeight: 950, letterSpacing: '-0.04em', fontSize: 28, color: '#0b1220' }}>PROOF</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <BrandMark size={50} src={staticFile('/remotion-assets/brands/solana.png')} alt="Solana" glow />
          <BrandMark size={50} src={staticFile('/remotion-assets/brands/usdc.png')} alt="USDC" />
          <BrandMark size={50} src={staticFile('/remotion-assets/brands/usdt.svg')} alt="USDT" />
        </div>
      </div>

      {/* Act 1 */}
      <Sequence from={0} durationInFrames={90}>
        <div style={{ position: 'absolute', top: 190, left: 56, right: 56 }}>
          <KineticType text="Stop losing money\nto broken escrow." from={0} size={88} maxWidth={960} />
          <div style={{ marginTop: 18, fontSize: 24, fontWeight: 750, color: 'rgba(15,23,42,0.70)' }}>
            Non-custodial. On-chain. Built for real commerce.
          </div>
        </div>
      </Sequence>

      {/* Act 2 */}
      <Sequence from={78} durationInFrames={120}>
        <div style={{ position: 'absolute', top: 520, left: 56, right: 56, display: 'flex', justifyContent: 'center' }}>
          <FlowStrip
            from={78}
            width={968}
            steps={[
              { label: 'Buyer locks', accent: 'blue' },
              { label: 'Seller proves', accent: 'teal' },
              { label: 'Auto release', accent: 'blue' },
            ]}
          />
        </div>
      </Sequence>

      {/* Act 3 */}
      <Sequence from={170} durationInFrames={130}>
        <div style={{ position: 'absolute', top: 760, left: 56, right: 56 }}>
          <KineticType text="Disputes settle\nby governance." from={170} size={76} maxWidth={960} />
          <div style={{ marginTop: 16, fontSize: 22, fontWeight: 750, color: 'rgba(15,23,42,0.70)' }}>
            Evidence is public. Votes are weighted. Funds settle on-chain.
          </div>
        </div>
      </Sequence>

      {/* CTA */}
      <Sequence from={240} durationInFrames={60}>
        <div
          style={{
            position: 'absolute',
            left: 56,
            right: 56,
            bottom: 90,
            padding: '18px 18px',
            borderRadius: 22,
            border: '1px solid rgba(15,23,42,0.10)',
            background: 'rgba(255,255,255,0.75)',
            boxShadow: '0 30px 100px rgba(2,6,23,0.14)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontWeight: 950, fontSize: 24, letterSpacing: '-0.03em', color: '#0b1220' }}>
              Proof Protocol
            </div>
            <div style={{ fontWeight: 750, fontSize: 18, color: 'rgba(15,23,42,0.70)', marginTop: 4 }}>
              Secure • Verify • Dispute • Vote • Settle
            </div>
          </div>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 999,
              background: 'linear-gradient(90deg, rgba(59,130,246,0.95), rgba(20,184,166,0.95))',
              color: 'white',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              boxShadow: '0 18px 60px rgba(59,130,246,0.22)',
              fontSize: 16,
            }}
          >
            Build with Proof
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

