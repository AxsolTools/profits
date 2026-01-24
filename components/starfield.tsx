'use client'

import React, { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: Star[] = []
    let animationFrameId: number
    let width = 0
    let height = 0

    const initStars = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      
      const starCount = Math.floor((width * height) / 15000)
      stars = []

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2, // Very slow horizontal drift
          vy: (Math.random() - 0.5) * 0.2, // Very slow vertical drift
          size: Math.random() * 1.5 + 0.5
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Draw connecting lines
      ctx.lineWidth = 0.5
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        
        // Update position
        star.x += star.vx
        star.y += star.vy

        // Wrap around screen
        if (star.x < 0) star.x = width
        if (star.x > width) star.x = 0
        if (star.y < 0) star.y = height
        if (star.y > height) star.y = 0

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? 'rgba(96, 165, 250, 0.8)' : 'rgba(45, 212, 191, 0.8)' // Blue or Teal
        ctx.fill()

        // Find connections
        for (let j = i + 1; j < stars.length; j++) {
          const otherStar = stars[j]
          const dx = star.x - otherStar.x
          const dy = star.y - otherStar.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(star.x, star.y)
            ctx.lineTo(otherStar.x, otherStar.y)
            const opacity = 1 - distance / 150
            ctx.strokeStyle = `rgba(96, 165, 250, ${opacity * 0.15})`
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    initStars()
    draw()

    const handleResize = () => {
      initStars()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-60"
      style={{ background: 'transparent' }}
    />
  )
}
