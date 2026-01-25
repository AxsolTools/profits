import React, { useEffect } from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, staticFile } from 'remotion';
import { preloadImage } from '@remotion/preload';
import { CinematicBg } from '../shared/cinematic-bg';
import { KineticType } from '../shared/kinetic-type';
import { BrandMark } from '../shared/brand';
import { ProgressBar } from '../shared/progress-bar';

export const ProofDisputeSquare: React.FC = () => {
  const frame = useCurrentFrame();

  useEffect(() => {
    preloadImage(staticFile('/remotion-assets/proof/proof-mark.png'));
    preloadImage(staticFile('/remotion-assets/brands/solana.png'));
    preloadImage(staticFile('/remotion-assets/brands/usdc.png'));
  }, []);

  const sellerPct = interpolate(frame, [40, 120], [22, 61], { extrapolateRight: 'clamp' });
  const buyerPct = 100 - sellerPct;

  return (
    <AbsoluteFill>
      <CinematicBg intensity={0.98} />

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

      {/* Lead */}
      <div style={{ position: 'absolute', top: 178, left: 56, right: 56 }}>
        <KineticType text="Disputes resolve\nin public." from={0} size={86} maxWidth={980} />
        <div style={{ marginTop: 18, fontSize: 22, fontWeight: 800, color: 'rgba(15,23,42,0.72)' }}>
          Evidence → Vote → Settlement. No platform custody.
        </div>
      </div>

      {/* Terminal card */}
      <Sequence from={24} durationInFrames={200}>
        <div
          style={{
            position: 'absolute',
            left: 56,
            right: 56,
            bottom: 56,
            padding: 18,
            borderRadius: 24,
            border: '1px solid rgba(15,23,42,0.10)',
            background: 'rgba(255,255,255,0.76)',
            boxShadow: '0 40px 120px rgba(2,6,23,0.14)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontWeight: 950, fontSize: 18, color: '#0b1220', letterSpacing: '-0.02em' }}>
              Dispute Terminal
            </div>
            <div style={{ fontWeight: 900, fontSize: 12, color: 'rgba(15,23,42,0.50)' }}>72h window • 10% voter fee pool</div>
          </div>

          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div
              style={{
                padding: 14,
                borderRadius: 18,
                border: '1px solid rgba(15,23,42,0.08)',
                background: 'rgba(255,255,255,0.72)',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 900, color: 'rgba(15,23,42,0.55)', letterSpacing: '0.12em' }}>EVIDENCE</div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <EvidenceLine label="Tracking number" value="1Z…K28" />
                <EvidenceLine label="Delivery photo" value="Verified" />
                <EvidenceLine label="Chat logs" value="Attached" />
              </div>
            </div>

            <div
              style={{
                padding: 14,
                borderRadius: 18,
                border: '1px solid rgba(15,23,42,0.08)',
                background: 'rgba(255,255,255,0.72)',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 900, color: 'rgba(15,23,42,0.55)', letterSpacing: '0.12em' }}>VOTE</div>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 900, color: 'rgba(15,23,42,0.60)' }}>
                  <span>Release</span>
                  <span>{Math.round(sellerPct)}%</span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <ProgressBar value={sellerPct} accent="blue" />
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 900, color: 'rgba(15,23,42,0.60)' }}>
                  <span>Refund</span>
                  <span>{Math.round(buyerPct)}%</span>
                </div>
                <div style={{ marginTop: 6 }}>
                  <ProgressBar value={buyerPct} accent="teal" />
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 900, color: 'rgba(15,23,42,0.70)' }}>
              Settlement: <span style={{ color: '#0b1220' }}>on-chain</span>
            </div>
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 999,
                background: 'linear-gradient(90deg, rgba(59,130,246,0.95), rgba(20,184,166,0.95))',
                color: 'white',
                fontWeight: 950,
                letterSpacing: '-0.02em',
                boxShadow: '0 18px 60px rgba(59,130,246,0.22)',
                fontSize: 14,
              }}
            >
              Vote to earn the 10%
            </div>
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

const EvidenceLine: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: 12, fontWeight: 900, color: 'rgba(15,23,42,0.55)' }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 950, color: '#0b1220' }}>{value}</div>
    </div>
  );
};

