'use client'

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img } from 'remotion'
import proofsLogo from '../../Proofslogotransparent.png'

export const SellerGuarantees = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

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

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Payment Card */}
        <div 
          className="bg-[#1e293b] p-6 rounded-[2rem] shadow-2xl shadow-black/50 border border-gray-700 backdrop-blur-xl relative overflow-hidden"
          style={{
            transform: `translateY(${interpolate(frame, [0, 30], [20, 0])}px)`,
            opacity: interpolate(frame, [0, 20], [0, 1])
          }}
        >
          <div className="flex items-center justify-between pb-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-700">
                 <Img src={proofsLogo.src} className="w-6 h-6 object-contain invert brightness-0" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Escrow #8921</p>
                <p className="text-xs text-gray-400 font-medium">Streamflow Protocol</p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/20 text-xs font-bold flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              SOLVENT
            </div>
          </div>
          
          <div className="py-6 space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Locked Amount</p>
              <p className="text-3xl font-black text-white tracking-tight">$2,500.00</p>
            </div>
            
            <div className="flex gap-2">
               <div className="h-1.5 w-full bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
               <div className="h-1.5 w-1/4 bg-gray-700 rounded-full" />
            </div>
          </div>

          <div 
            className="bg-[#0f172a] text-white p-4 rounded-xl flex items-center justify-between transform transition-transform border border-gray-800"
            style={{ 
              transform: `scale(${spring({ frame: frame - 30, fps, from: 0.9, to: 1 })})`,
              opacity: interpolate(frame, [30, 40], [0, 1])
            }}
          >
            <span className="font-medium text-sm text-gray-300">Proof Verified</span>
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>
        </div>

        {/* Floating Success Particles */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute z-20"
            style={{
              left: `${20 + i * 20}%`,
              top: '50%',
              opacity: interpolate(frame, [40 + i * 5, 50 + i * 5, 70 + i * 5], [0, 1, 0]),
              transform: `translateY(-${interpolate(frame, [40 + i * 5, 90 + i * 5], [0, 80])}px) scale(${Math.random() * 0.5 + 0.8})`
            }}
          >
            <div className="bg-green-400 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}
