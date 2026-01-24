'use client'

import React, { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function NetworkMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let nodes: Node[] = []
    let animationFrameId: number
    let width = 0
    let height = 0

    const initNodes = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      
      // Density: Fewer nodes for a cleaner look
      const nodeCount = Math.floor((width * height) / 25000)
      nodes = []

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3, // Gentle drift
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Draw connections first (behind nodes)
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges gently
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        // Find connections
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j]
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Longer connection distance for a "web" feel
          if (distance < 200) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            // Very subtle gray lines
            const opacity = (1 - distance / 200) * 0.15
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        // Soft blue/gray fill
        ctx.fillStyle = i % 3 === 0 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(156, 163, 175, 0.4)'
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    initNodes()
    draw()

    const handleResize = () => {
      initNodes()
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
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}
