'use client'

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion'

export const VotingROI = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  
  // Smoother springs
  const fillWidth = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 100 },
    from: 0,
    to: 75,
  })

  const stakeWidth = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15, stiffness: 100 },
    from: 0,
    to: 50,
  })

  const reward = Math.round(interpolate(frame, [45, 90], [0, 450], {
    extrapolateRight: 'clamp',
    easing: (t) => t * (2 - t), // Ease out
  }))

  return (
    <AbsoluteFill className="bg-[#0B1120] p-10 text-white font-sans relative overflow-hidden">
      {/* Dark Premium Background with Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

      <h3 className="text-3xl font-black mb-10 tracking-tight z-10 relative">Voting ROI Calculator</h3>

      <div className="space-y-8 z-10 relative">
        {/* Disputed Value Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-wider">
            <span>Disputed Value</span>
            <span className="text-white">$10,000</span>
          </div>
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden shadow-inner border border-gray-700">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              style={{ width: `${fillWidth}%` }}
            />
          </div>
        </div>

        {/* Stake Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-wider">
            <span>Your Stake</span>
            <span className="text-white">50,000 $PROOF</span>
          </div>
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden shadow-inner border border-gray-700">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-teal-300 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]"
              style={{ width: `${stakeWidth}%` }}
            />
          </div>
        </div>

        {/* Reward Card */}
        <div 
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700 mt-8 shadow-2xl relative overflow-hidden"
          style={{ 
            transform: `scale(${spring({ frame: frame - 50, fps, from: 0.9, to: 1 })})`, 
            opacity: interpolate(frame, [50, 60], [0, 1]) 
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Reward</p>
          <div className="flex items-end gap-3">
            <span className="text-6xl font-black text-white tracking-tighter">${reward}.00</span>
            <span className="text-green-400 font-bold text-lg mb-2 bg-green-400/10 px-2 py-1 rounded">+ APY</span>
          </div>
          
          <div className="mt-6 flex gap-4 border-t border-gray-700 pt-6">
            <div className="text-center">
               <p className="text-[10px] text-gray-500 font-bold uppercase">Base</p>
               <p className="font-bold">10%</p>
            </div>
            <div className="text-center border-l border-gray-700 pl-4">
               <p className="text-[10px] text-gray-500 font-bold uppercase">Multiplier</p>
               <p className="font-bold text-blue-400">1.2x</p>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
