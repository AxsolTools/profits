"use client";

import React from "react"

import { useState, useEffect } from "react";
import {
  GoFundMeIcon,
  PatreonIcon,
  PayPalIcon,
  TwitchIcon,
  YouTubeIcon,
  XIcon,
  VenmoIcon,
  KofiIcon,
  KickIcon,
} from "./brand-icons";
import { VerificationModal } from "./verification-modal";

const platformIcons: Record<string, React.ReactNode> = {
  GoFundMe: <GoFundMeIcon className="w-5 h-5" />,
  Patreon: <PatreonIcon className="w-5 h-5" />,
  PayPal: <PayPalIcon className="w-5 h-5" />,
  Twitch: <TwitchIcon className="w-5 h-5" />,
  YouTube: <YouTubeIcon className="w-5 h-5" />,
  "X Subscriptions": <XIcon className="w-5 h-5" />,
  Venmo: <VenmoIcon className="w-5 h-5" />,
  "Ko-fi": <KofiIcon className="w-5 h-5" />,
  Kick: <KickIcon className="w-5 h-5" />,
};

const platformColors: Record<string, string> = {
  GoFundMe: "#00b964",
  Patreon: "#ff424d",
  PayPal: "#003087",
  Twitch: "#9146ff",
  YouTube: "#ff0000",
  "X Subscriptions": "#1DA1F2",
  Venmo: "#008CFF",
  "Ko-fi": "#ff5e5b",
  Kick: "#53fc18",
};

type ProofCard = {
  id: number;
  sender: string;
  recipient: string;
  amount: string;
  platform: string;
  campaign: string;
  timestamp: string;
  fullTimestamp: string;
  txHash: string;
  blockNumber: string;
  status: "verified" | "pending";
  recipientImage?: string;
};

const liveProofs: ProofCard[] = [
  {
    id: 1,
    sender: "CryptoWhale_92",
    recipient: "MrBeast",
    amount: "500.00",
    platform: "GoFundMe",
    campaign: "Team Trees 2.0",
    timestamp: "2m ago",
    fullTimestamp: "Jan 18, 2026 at 2:34 PM",
    txHash: "0x7f3a...91b",
    blockNumber: "19,847,392",
    status: "verified",
  },
  {
    id: 2,
    sender: "DeFi_Degen",
    recipient: "Pokimane",
    amount: "25.00",
    platform: "Twitch",
    campaign: "Monthly Sub",
    timestamp: "5m ago",
    fullTimestamp: "Jan 18, 2026 at 2:31 PM",
    txHash: "0x2c8d...f4a2",
    blockNumber: "19,847,388",
    status: "verified",
  },
  {
    id: 3,
    sender: "SolanaMaxi",
    recipient: "Marques Brownlee",
    amount: "100.00",
    platform: "Patreon",
    campaign: "MKBHD Premium",
    timestamp: "8m ago",
    fullTimestamp: "Jan 18, 2026 at 2:28 PM",
    txHash: "0x9e1f...b7c3",
    blockNumber: "19,847,381",
    status: "verified",
  },
  {
    id: 4,
    sender: "ETH_Holder",
    recipient: "Ludwig",
    amount: "50.00",
    platform: "YouTube",
    campaign: "Channel Membership",
    timestamp: "12m ago",
    fullTimestamp: "Jan 18, 2026 at 2:24 PM",
    txHash: "0x4b2a...d8e5",
    blockNumber: "19,847,374",
    status: "verified",
  },
  {
    id: 5,
    sender: "NFT_Collector",
    recipient: "Charli D'Amelio",
    amount: "15.00",
    platform: "X Subscriptions",
    campaign: "Premium Content",
    timestamp: "15m ago",
    fullTimestamp: "Jan 18, 2026 at 2:21 PM",
    txHash: "0x1d7c...a9f6",
    blockNumber: "19,847,365",
    status: "verified",
  },
  {
    id: 6,
    sender: "Web3_Builder",
    recipient: "Gary Vee",
    amount: "250.00",
    platform: "Ko-fi",
    campaign: "Business Mentorship",
    timestamp: "18m ago",
    fullTimestamp: "Jan 18, 2026 at 2:18 PM",
    txHash: "0x6f4e...c2d8",
    blockNumber: "19,847,358",
    status: "verified",
  },
  {
    id: 7,
    sender: "TokenTrader",
    recipient: "Ninja",
    amount: "75.00",
    platform: "Kick",
    campaign: "Stream Support",
    timestamp: "22m ago",
    fullTimestamp: "Jan 18, 2026 at 2:14 PM",
    txHash: "0x8a3b...e1f9",
    blockNumber: "19,847,349",
    status: "pending",
  },
  {
    id: 8,
    sender: "AltcoinAlpha",
    recipient: "Linus Tech Tips",
    amount: "200.00",
    platform: "Patreon",
    campaign: "LTT Supporter",
    timestamp: "25m ago",
    fullTimestamp: "Jan 18, 2026 at 2:11 PM",
    txHash: "0x3c9d...b4a7",
    blockNumber: "19,847,340",
    status: "verified",
  },
];

const filterTabs = [
  { id: "all", label: "All Proofs", icon: null },
  { id: "GoFundMe", label: "GoFundMe", icon: <GoFundMeIcon className="w-4 h-4" /> },
  { id: "Patreon", label: "Patreon", icon: <PatreonIcon className="w-4 h-4" /> },
  { id: "Twitch", label: "Twitch", icon: <TwitchIcon className="w-4 h-4" /> },
  { id: "YouTube", label: "YouTube", icon: <YouTubeIcon className="w-4 h-4" /> },
  { id: "X Subscriptions", label: "X Subs", icon: <XIcon className="w-4 h-4" /> },
];

function ProofCardComponent({ 
  proof, 
  onClick 
}: { 
  proof: ProofCard; 
  onClick: () => void;
}) {
  const platformColor = platformColors[proof.platform] || "#1DA1F2";
  
  return (
    <button
      type="button"
      onClick={onClick}
      className="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl p-5 text-left transition-all duration-300 w-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${platformColor}20` }}
          >
            {platformIcons[proof.platform]}
          </div>
          <div>
            <p className="text-gray-900 font-medium text-sm">{proof.campaign}</p>
            <p className="text-[#6b7b8f] text-xs">{proof.platform}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          proof.status === "verified" 
            ? "bg-[#00c853]/10 text-[#00c853]" 
            : "bg-[#ff9800]/10 text-[#ff9800]"
        }`}>
          {proof.status === "verified" ? "Verified" : "Pending"}
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0D8ECF] flex items-center justify-center text-[10px] text-white font-bold">
              {proof.sender.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-[#8b9caf] text-sm">@{proof.sender.length > 12 ? `${proof.sender.slice(0, 12)}...` : proof.sender}</span>
          </div>
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#4a5a6a]" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <div className="flex items-center gap-2">
            <span className="text-[#8b9caf] text-sm">@{proof.recipient.length > 12 ? `${proof.recipient.slice(0, 12)}...` : proof.recipient}</span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ee5a5a] flex items-center justify-center text-[10px] text-white font-bold">
              {proof.recipient.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div>
          <p className="text-[#00c853] font-bold text-2xl">${proof.amount}</p>
          <p className="text-[#6b7b8f] text-xs mt-1">{proof.timestamp}</p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[#1DA1F2] text-sm font-medium">View Proof</span>
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#1DA1F2]" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function ExpandedProofModal({ 
  proof, 
  onClose 
}: { 
  proof: ProofCard; 
  onClose: () => void;
}) {
  const platformColor = platformColors[proof.platform] || "#1DA1F2";

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <div 
        className="relative w-full max-w-xl bg-white border border-transparent rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient Header */}
        <div 
          className="h-2"
          style={{ background: `linear-gradient(90deg, ${platformColor}, ${platformColor}88)` }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors z-10"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Platform Badge */}
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${platformColor}20` }}
            >
              <div className="scale-150">
                {platformIcons[proof.platform]}
              </div>
            </div>
            <div>
              <p className="text-gray-900 font-bold text-xl">{proof.campaign}</p>
              <p className="text-[#6b7b8f]">via {proof.platform}</p>
            </div>
          </div>

          {/* Payment Flow */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0D8ECF] flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                  {proof.sender.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-gray-900 font-medium">@{proof.sender}</p>
                <p className="text-[#6b7b8f] text-sm">Sender</p>
              </div>
              
              <div className="flex-1 px-4">
                <div className="relative">
                  <div className="h-[2px] bg-gradient-to-r from-[#1DA1F2] via-[#00c853] to-[#ff6b6b]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-4">
                    <p className="text-[#00c853] font-bold text-3xl">${proof.amount}</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ee5a5a] flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                  {proof.recipient.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-gray-900 font-medium">@{proof.recipient}</p>
                <p className="text-[#6b7b8f] text-sm">Recipient</p>
              </div>
            </div>
          </div>

          {/* Verification Details */}
          <div className="bg-gradient-to-br from-[#0d1a20] to-[#0d1520] border border-[#00c853]/30 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00c853] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <span className="text-[#00c853] font-bold text-lg block">VERIFIED ON-CHAIN</span>
                <span className="text-[#71767b] text-sm">Solana Network</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-[#6b7b8f]">Transaction Hash</span>
                <span className="text-[#1DA1F2] font-mono">{proof.txHash}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-[#6b7b8f]">Block Number</span>
                <span className="text-gray-900 font-mono">{proof.blockNumber}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#6b7b8f]">Timestamp</span>
                <span className="text-gray-900">{proof.fullTimestamp}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 py-4 bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              View on X
            </button>
            <button className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl text-gray-900 font-semibold transition-colors flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Explorer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LiveProofsFeed() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProof, setSelectedProof] = useState<ProofCard | null>(null);
  const [proofs, setProofs] = useState(liveProofs);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProofs((prev) => {
        const updated = [...prev];
        const randomIndex = Math.floor(Math.random() * updated.length);
        updated[randomIndex] = {
          ...updated[randomIndex],
          timestamp: `${Math.floor(Math.random() * 30)}m ago`,
        };
        return updated;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredProofs = activeFilter === "all" 
    ? proofs 
    : proofs.filter(p => p.platform === activeFilter);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#00c853]/10 border border-[#00c853]/20 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
              <span className="text-[#00c853] text-sm font-medium">Live Feed</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Verified Proofs
            </h2>
            <p className="text-[#6b7b8f] text-lg">
              Real-time payment verifications across all platforms
            </p>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => setIsVerificationModalOpen(true)}
            className="group relative overflow-hidden bg-gradient-to-r from-[#1DA1F2] to-[#0D8ECF] hover:from-[#1a8cd8] hover:to-[#0b7ab8] rounded-2xl px-8 py-4 text-white font-semibold transition-all duration-300 shadow-lg shadow-[#1DA1F2]/20"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Start Verifying Payments
              <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? "bg-[#1DA1F2] text-white"
                  : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          <div className="flex items-center gap-2 ml-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search proofs..."
                className="bg-white border border-transparent rounded-xl px-4 py-2.5 pl-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1DA1F2] w-48"
              />
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#4a5a6a] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        {/* Proofs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProofs.map((proof) => (
            <ProofCardComponent
              key={proof.id}
              proof={proof}
              onClick={() => setSelectedProof(proof)}
            />
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-8 flex items-center justify-between bg-white border border-transparent rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
            <span className="text-[#6b7b8f] text-sm">Online</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-[#6b7b8f]">
              <strong className="text-gray-900">{filteredProofs.length}</strong> proofs shown
            </span>
            <span className="text-[#6b7b8f]">
              Total Volume: <strong className="text-[#00c853]">$1,215.00</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Modal */}
      {selectedProof && (
        <ExpandedProofModal
          proof={selectedProof}
          onClose={() => setSelectedProof(null)}
        />
      )}

      {/* Verification Modal */}
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />
    </section>
  );
}
