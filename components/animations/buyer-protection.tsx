'use client'

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img } from 'remotion'
import proofsLogo from '../../Proofslogotransparent.png'

export const BuyerProtection = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  
  const shieldScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12 },
    from: 0,
    to: 1
  })

  // Floating animation loop
  const floatY = Math.sin(frame / 30) * 10

  return (
    <AbsoluteFill className="bg-[#0B1120] flex items-center justify-center p-8 overflow-hidden">
      {/* Dark Premium Background with Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />

      <div 
        className="relative z-10"
        style={{ 
          transform: `scale(${shieldScale}) translateY(${floatY}px)` 
        }}
      >
        {/* Main Logo Container */}
        <div className="w-64 h-64 bg-[#1e293b] rounded-[3rem] flex items-center justify-center shadow-2xl shadow-blue-500/20 border border-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent" />
          
          <Img 
            src={proofsLogo.src} 
            className="w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            style={{
              opacity: interpolate(frame, [10, 30], [0, 1])
            }}
          />
        </div>
        
        {/* Secured Badge */}
        <div 
          className="absolute -top-6 -right-6 bg-[#22c55e] text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-green-900/50 border border-green-400/20 flex items-center gap-2 transform hover:scale-105 transition-transform"
          style={{ 
            opacity: interpolate(frame, [30, 40], [0, 1]),
            transform: `translateY(${interpolate(frame, [30, 60], [20, 0])}px) rotate(3deg)`
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          SECURED
        </div>
        
        {/* Status Card */}
        <div 
          className="absolute -bottom-8 -left-8 bg-[#1e293b]/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-700 flex items-center gap-4 w-60"
          style={{ 
            opacity: interpolate(frame, [45, 55], [0, 1]),
            transform: `translateX(${interpolate(frame, [45, 75], [-20, 0])}px)`
          }}
        >
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Smart Contract</p>
            <p className="text-base font-bold text-white">Funds Locked</p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
