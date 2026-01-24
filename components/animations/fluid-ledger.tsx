'use client'

import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { createNoise3D } from 'simplex-noise'
import React, { useMemo } from 'react'

const noise3D = createNoise3D()

export const FluidLedger = () => {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()

  // Generate flow lines
  const lines = useMemo(() => {
    return new Array(40).fill(0).map((_, i) => ({
      id: i,
      x: (width / 40) * i,
      speed: 0.002 + Math.random() * 0.001,
      color: i % 2 === 0 ? '#2563eb' : '#0d9488', // Blue or Teal (Darkened)
      width: Math.random() * 2 + 1,
    }))
  }, [width])

  // Draw curves
  const paths = lines.map((line) => {
    let d = `M ${line.x} 0`
    
    // Draw points down the screen
    for (let y = 0; y <= height; y += 20) {
      // Noise determines x-offset based on y and time
      const xOffset = noise3D(line.x * 0.002, y * 0.003, frame * line.speed) * 150
      d += ` L ${line.x + xOffset} ${y}`
    }

    return (
      <path
        key={line.id}
        d={d}
        fill="none"
        stroke={line.color}
        strokeWidth={line.width}
        strokeOpacity={0.15}
        style={{ mixBlendMode: 'multiply' }}
      />
    )
  })

  return (
    <AbsoluteFill className="bg-white">
      <svg width={width} height={height} className="absolute inset-0">
        {/* Soft Background Gradient */}
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#bgGrad)" />
        
        {/* Fluid Lines */}
        {paths}
        
        {/* Floating Orbs for extra depth */}
        <circle 
          cx={width * 0.2} 
          cy={height * 0.3} 
          r={300} 
          fill="url(#blueOrb)" 
          opacity={0.05 + Math.sin(frame * 0.02) * 0.02} 
        />
        <circle 
          cx={width * 0.8} 
          cy={height * 0.7} 
          r={250} 
          fill="url(#tealOrb)" 
          opacity={0.05 + Math.cos(frame * 0.025) * 0.02} 
        />

        <defs>
          <radialGradient id="blueOrb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="tealOrb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </AbsoluteFill>
  )
}
