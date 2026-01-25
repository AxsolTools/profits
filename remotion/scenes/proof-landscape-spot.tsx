import React, { useEffect } from 'react';
import { AbsoluteFill, Sequence, staticFile } from 'remotion';
import { preloadImage } from '@remotion/preload';
import { CinematicBg } from '../shared/cinematic-bg';
import { KineticType } from '../shared/kinetic-type';
import { FlowStrip } from '../shared/flow-strip';
import { BrandMark } from '../shared/brand';

export const ProofLandscapeSpot: React.FC = () => {
  useEffect(() => {
    preloadImage(staticFile('/remotion-assets/proof/proof-mark.png'));
    preloadImage(staticFile('/remotion-assets/brands/solana.png'));
    preloadImage(staticFile('/remotion-assets/brands/usdc.png'));
    preloadImage(staticFile('/remotion-assets/brands/usdt.svg'));
  }, []);

  return (
    <AbsoluteFill>
      <CinematicBg intensity={0.9} />

      {/* Header */}
      <div style={{ position: 'absolute', top: 54, left: 72, right: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={staticFile('/remotion-assets/proof/proof-mark.png')} alt="Proof logo" style={{ width: 48, height: 48 }} />
          <div style={{ fontWeight: 950, letterSpacing: '-0.04em', fontSize: 26, color: '#0b1220' }}>PROOF</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <BrandMark size={46} src={staticFile('/remotion-assets/brands/solana.png')} alt="Solana" glow />
          <BrandMark size={46} src={staticFile('/remotion-assets/brands/usdc.png')} alt="USDC" />
          <BrandMark size={46} src={staticFile('/remotion-assets/brands/usdt.svg')} alt="USDT" />
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.78)',
              border: '1px solid rgba(15,23,42,0.10)',
              fontWeight: 900,
              fontSize: 12,
              color: 'rgba(15,23,42,0.70)',
              letterSpacing: '0.12em',
            }}
          >
            STREAMFLOW
          </div>
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.78)',
              border: '1px solid rgba(15,23,42,0.10)',
              fontWeight: 900,
              fontSize: 12,
              color: 'rgba(15,23,42,0.70)',
              letterSpacing: '0.12em',
            }}
          >
            REALMS
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ position: 'absolute', left: 72, top: 180, width: 940 }}>
        <KineticType text="The escrow layer\nfor real commerce." from={0} size={96} maxWidth={940} />
        <div style={{ marginTop: 18, fontSize: 26, fontWeight: 750, color: 'rgba(15,23,42,0.72)' }}>
          Non-custodial funds. Public evidence. Governance disputes.
        </div>
      </div>

      {/* Right product card */}
      <Sequence from={22} durationInFrames={250}>
        <div
          style={{
            position: 'absolute',
            right: 72,
            top: 210,
            width: 720,
            padding: 22,
            borderRadius: 24,
            border: '1px solid rgba(15,23,42,0.10)',
            background: 'rgba(255,255,255,0.76)',
            boxShadow: '0 40px 120px rgba(2,6,23,0.14)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontWeight: 950, fontSize: 18, color: '#0b1220', letterSpacing: '-0.02em' }}>
              Escrow Session
            </div>
            <div style={{ fontWeight: 850, fontSize: 12, color: 'rgba(15,23,42,0.50)' }}>streamflow_id • realms_proposal</div>
          </div>

          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div
              style={{
                padding: 16,
                borderRadius: 18,
                border: '1px solid rgba(15,23,42,0.08)',
                background: 'rgba(255,255,255,0.70)',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 900, color: 'rgba(15,23,42,0.55)', letterSpacing: '0.12em' }}>
                LOCKED
              </div>
              <div style={{ marginTop: 10, fontWeight: 950, fontSize: 34, letterSpacing: '-0.03em', color: '#0b1220' }}>
                $5,000
              </div>
              <div style={{ marginTop: 4, fontWeight: 800, fontSize: 14, color: 'rgba(15,23,42,0.60)' }}>USDC on Solana</div>
            </div>

            <div
              style={{
                padding: 16,
                borderRadius: 18,
                border: '1px solid rgba(15,23,42,0.08)',
                background: 'rgba(255,255,255,0.70)',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 900, color: 'rgba(15,23,42,0.55)', letterSpacing: '0.12em' }}>
                DISPUTE FEE
              </div>
              <div style={{ marginTop: 10, fontWeight: 950, fontSize: 34, letterSpacing: '-0.03em', color: '#0b1220' }}>
                10%
              </div>
              <div style={{ marginTop: 4, fontWeight: 800, fontSize: 14, color: 'rgba(15,23,42,0.60)' }}>Paid to aligned voters</div>
            </div>
          </div>

          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <FlowStrip
              from={34}
              width={676}
              steps={[
                { label: 'Secure', accent: 'blue' },
                { label: 'Verify', accent: 'teal' },
                { label: 'Dispute', accent: 'blue' },
                { label: 'Vote', accent: 'teal' },
                { label: 'Settle', accent: 'blue' },
              ]}
            />
          </div>
        </div>
      </Sequence>

      {/* Footer CTA */}
      <Sequence from={340} durationInFrames={110}>
        <div style={{ position: 'absolute', left: 72, right: 72, bottom: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 900, fontSize: 18, color: 'rgba(15,23,42,0.70)' }}>
            Use cases: e-commerce • freelancing • real estate • B2B • bookings • digital assets
          </div>
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 999,
              background: 'linear-gradient(90deg, rgba(59,130,246,0.95), rgba(20,184,166,0.95))',
              color: 'white',
              fontWeight: 950,
              letterSpacing: '-0.02em',
              boxShadow: '0 18px 60px rgba(59,130,246,0.22)',
              fontSize: 16,
            }}
          >
            Proof it. Settle it.
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

