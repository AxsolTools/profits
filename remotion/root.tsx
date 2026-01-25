import React, { useEffect } from 'react';
import { Composition } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { ProofXSquare } from './scenes/proof-x-square';
import { ProofVerticalShort } from './scenes/proof-vertical-short';
import { ProofLandscapeSpot } from './scenes/proof-landscape-spot';
import './styles.css';

export const RemotionRoot: React.FC = () => {
  useEffect(() => {
    // Deterministic font loading for preview & render.
    loadFont();
  }, []);

  return (
    <>
      <Composition
        id="Proof_X_Square"
        component={ProofXSquare}
        durationInFrames={6 * 30}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />

      <Composition
        id="Proof_Vertical_Short"
        component={ProofVerticalShort}
        durationInFrames={10 * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      <Composition
        id="Proof_Landscape_Spot"
        component={ProofLandscapeSpot}
        durationInFrames={15 * 30}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};

