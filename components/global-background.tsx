'use client'

import { Player } from '@remotion/player'
import { FluidBackground } from './animations/fluid-background'

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-100">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-gray-100/50" />
      
      {/* Fluid Animation Layer */}
      <div className="absolute inset-0">
        <Player
          component={FluidBackground}
          durationInFrames={300}
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          controls={false}
          loop
          autoPlay
        />
      </div>
    </div>
  )
}
