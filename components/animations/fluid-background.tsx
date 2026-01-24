'use client'

import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { createNoise3D } from 'simplex-noise'
import React, { useMemo } from 'react'

const noise3D = createNoise3D()

export const FluidBackground = () => {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()

  // Generate flow lines - Reduced count for subtle background
  const lines = useMemo(() => {
    return new Array(25).fill(0).map((_, i) => ({
      id: i,
      x: (width / 25) * i,
      speed: 0.001 + Math.random() * 0.0005,
      color: i % 2 === 0 ? '#3b82f6' : '#14b8a6', // Blue or Teal
      width: Math.random() * 1.5 + 0.5,
    }))
  }, [width])

  // Draw curves
  const paths = lines.map((line) => {
    let d = `M ${line.x} 0`
    
    // Draw points down the screen
    for (let y = 0; y <= height; y += 40) {
      // Noise determines x-offset based on y and time
      const xOffset = noise3D(line.x * 0.001, y * 0.002, frame * line.speed) * 100
      d += ` L ${line.x + xOffset} ${y}`
    }

    return (
      <path
        key={line.id}
        d={d}
        fill="none"
        stroke={line.color}
        strokeWidth={line.width}
        strokeOpacity={0.08} // Very subtle
        style={{ mixBlendMode: 'multiply' }}
      />
    )
  })

  return (
    <AbsoluteFill className="bg-transparent">
      <svg width={width} height={height} className="absolute inset-0 pointer-events-none">
        {paths}
        
        {/* Subtle Ambient Orbs */}
        <circle 
          cx={width * 0.1} 
          cy={height * 0.2} 
          r={400} 
          fill="url(#blueOrbGlobal)" 
          opacity={0.03 + Math.sin(frame * 0.01) * 0.01} 
        />
        <circle 
          cx={width * 0.9} 
          cy={height * 0.8} 
          r={350} 
          fill="url(#tealOrbGlobal)" 
          opacity={0.03 + Math.cos(frame * 0.015) * 0.01} 
        />

        <defs>
          <radialGradient id="blueOrbGlobal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="tealOrbGlobal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </AbsoluteFill>
  )
}
