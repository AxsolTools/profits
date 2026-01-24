'use client'

import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'

const codeLines = [
  'const proof = new ProofClient({',
  '  apiKey: "pk_live_8923..."',
  '});',
  '',
  '// Initialize Escrow',
  'const escrow = await proof.escrow.create({',
  '  buyer: "0x71...9A2",',
  '  seller: "0x3B...1C4",',
  '  amount: 5000,',
  '  token: "USDC",',
  '  timeout: "14d"',
  '});',
  '',
  '// Webhook Response',
  'console.log(escrow.status); // "LOCKED"'
]

export const DeveloperAPI = () => {
  const frame = useCurrentFrame()
  
  // Smoother typing effect
  const progress = interpolate(frame, [0, 90], [0, codeLines.length], {
    extrapolateRight: 'clamp',
  })
  
  const activeLineIndex = Math.floor(progress)
  
  return (
    <AbsoluteFill className="bg-[#0D1117] text-gray-300 font-mono text-sm leading-relaxed overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Editor Window Header */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-[#161B22] flex items-center justify-between px-4 border-b border-gray-800 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443B]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <div className="text-xs text-gray-500 font-medium font-sans">create-escrow.ts</div>
        <div className="w-12" /> {/* Spacer for centering */}
      </div>
      
      {/* Code Area */}
      <div className="mt-14 px-6 relative z-10">
        {/* Line Numbers */}
        <div className="absolute left-4 top-0 bottom-0 w-6 text-right text-gray-600 select-none text-xs leading-6 pt-[2px] font-mono">
          {codeLines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <div className="ml-8 space-y-[2px]">
          {codeLines.map((line, i) => (
            <div 
              key={i} 
              className={`transition-opacity duration-100 h-6 flex items-center ${i === activeLineIndex ? 'bg-blue-500/10 -mx-4 px-4 rounded' : ''}`}
              style={{ opacity: i < progress ? 1 : 0 }}
            >
              <span dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }} />
              {/* Cursor */}
              {i === activeLineIndex && (
                 <span className="w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Success Toast */}
      <div 
        className="absolute bottom-6 right-6 bg-[#1F6FEB] text-white px-4 py-3 rounded-lg border border-blue-400/30 text-xs font-bold shadow-2xl flex items-center gap-3"
        style={{ 
          opacity: frame > 100 ? 1 : 0,
          transform: `translateY(${frame > 100 ? 0 : 20}px)`,
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <div className="bg-white/20 p-1 rounded-full">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        <div className="flex flex-col">
          <span className="leading-none">Success</span>
          <span className="text-[10px] opacity-80 font-normal mt-0.5">Escrow #1928 created</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function highlightSyntax(code: string) {
  // Use callback function for replacement to avoid $0 issues
  return code
    .replace(/(const|await|new)/g, '<span class="text-[#FF7B72]">$1</span>')
    .replace(/(ProofClient|proof|escrow|console)/g, '<span class="text-[#79C0FF]">$1</span>')
    .replace(/(create|log)/g, '<span class="text-[#D2A8FF]">$1</span>')
    .replace(/"(.*?)"/g, (match) => `<span class="text-[#A5D6FF]">${match}</span>`)
    .replace(/(\d+)/g, '<span class="text-[#79C0FF]">$1</span>')
    .replace(/(\/\/.*)/g, '<span class="text-[#8B949E] italic">$1</span>')
    .replace(/({|}|:|,)/g, '<span class="text-[#C9D1D9]">$1</span>')
}
