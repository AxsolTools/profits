"use client";

import React from "react"
import { useState } from "react";
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
import { useProofs } from "@/hooks/use-proofs";
import { formatDistanceToNow } from "date-fns";

const platformIcons: Record<string, React.ReactNode> = {
  gofundme: <GoFundMeIcon className="w-5 h-5" />,
  patreon: <PatreonIcon className="w-5 h-5" />,
  paypal: <PayPalIcon className="w-5 h-5" />,
  twitch: <TwitchIcon className="w-5 h-5" />,
  youtube: <YouTubeIcon className="w-5 h-5" />,
  "x-subscriptions": <XIcon className="w-5 h-5" />,
  venmo: <VenmoIcon className="w-5 h-5" />,
  kofi: <KofiIcon className="w-5 h-5" />,
  kick: <KickIcon className="w-5 h-5" />,
};

const platformColors: Record<string, string> = {
  gofundme: "#00b964",
  patreon: "#ff424d",
  paypal: "#003087",
  twitch: "#9146ff",
  youtube: "#ff0000",
  "x-subscriptions": "var(--proof-primary)",
  venmo: "#008CFF",
  kofi: "#ff5e5b",
  kick: "#53fc18",
};

const filterTabs = [
  { id: "all", label: "All Proofs", icon: null },
  { id: "gofundme", label: "GoFundMe", icon: <GoFundMeIcon className="w-4 h-4" /> },
  { id: "patreon", label: "Patreon", icon: <PatreonIcon className="w-4 h-4" /> },
  { id: "twitch", label: "Twitch", icon: <TwitchIcon className="w-4 h-4" /> },
  { id: "youtube", label: "YouTube", icon: <YouTubeIcon className="w-4 h-4" /> },
  { id: "x-subscriptions", label: "X Subs", icon: <XIcon className="w-4 h-4" /> },
];

function ProofCardComponent({ 
  proof, 
  onClick 
}: { 
  proof: any; 
  onClick: () => void;
}) {
  const platformSlug = proof.platform?.slug || 'gofundme'
  const platformColor = platformColors[platformSlug] || "var(--proof-primary)";
  
  return (
    <button
      type="button"
      onClick={onClick}
      className="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl p-5 text-left transition-all duration-300 w-full"
    >
      <header className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${platformColor}20` }}
          >
            {platformIcons[platformSlug]}
          </div>
          <div>
            <h3 className="text-gray-900 font-medium text-sm">{proof.campaign_name}</h3>
            <p className="text-[#6b7b8f] text-xs">{proof.platform?.name}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          proof.status === "verified" 
            ? "bg-[#00c853]/10 text-[#00c853]" 
            : "bg-[#ff9800]/10 text-[#ff9800]"
        }`}>
          {proof.status === "verified" ? "Verified" : "Pending"}
        </div>
      </header>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--proof-primary)] to-[var(--proof-primary-dark)] flex items-center justify-center text-[10px] text-white font-bold">
              {proof.sender?.username?.slice(0, 2).toUpperCase() || 'AN'}
            </div>
            <span className="text-[#8b9caf] text-sm">@{proof.sender?.username || 'Anonymous'}</span>
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

      <footer className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div>
          <p className="text-[#00c853] font-bold text-2xl">${proof.amount}</p>
          <p className="text-[#6b7b8f] text-xs mt-1">{formatDistanceToNow(new Date(proof.created_at), { addSuffix: true })}</p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[var(--proof-primary)] text-sm font-medium">View Proof</span>
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[var(--proof-primary)]" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </footer>
    </button>
  );
}

function ExpandedProofModal({ 
  proof, 
  onClose 
}: { 
  proof: any; 
  onClose: () => void;
}) {
  const platformSlug = proof.platform?.slug || 'gofundme'
  const platformColor = platformColors[platformSlug] || "var(--proof-primary)";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <article 
        className="relative w-full max-w-xl bg-white border border-transparent rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="h-2"
          style={{ background: `linear-gradient(90deg, ${platformColor}, ${platformColor}88)` }}
        />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors z-10"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <header className="flex items-center gap-4 mb-6">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${platformColor}20` }}
            >
              <div className="scale-150">
                {platformIcons[platformSlug]}
              </div>
            </div>
            <div>
              <h2 className="text-gray-900 font-bold text-xl">{proof.campaign_name}</h2>
              <p className="text-[#6b7b8f]">via {proof.platform?.name}</p>
            </div>
          </header>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--proof-primary)] to-[var(--proof-primary-dark)] flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                  {proof.sender?.username?.slice(0, 2).toUpperCase() || 'AN'}
                </div>
                <p className="text-gray-900 font-medium">@{proof.sender?.username || 'Anonymous'}</p>
                <p className="text-[#6b7b8f] text-sm">Sender</p>
              </div>
              
              <div className="flex-1 px-4">
                <div className="relative">
                  <div className="h-[2px] bg-gradient-to-r from-[var(--proof-primary)] via-[#00c853] to-[#ff6b6b]" />
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

          <div className="bg-gradient-to-br from-[#0d1a20] to-[#0d1520] border border-[#00c853]/30 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00c853] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <span className="text-[#00c853] font-bold text-lg block">VERIFIED ON-CHAIN</span>
                <span className="text-[#71767b] text-sm">{proof.chain} Network</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <span className="text-[#6b7b8f]">Transaction Hash</span>
                <span className="text-[var(--proof-primary)] font-mono text-sm">{proof.tx_hash}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <span className="text-[#6b7b8f]">Block Number</span>
                <span className="text-gray-200 font-mono text-sm">{proof.block_number}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#6b7b8f]">Timestamp</span>
                <span className="text-gray-200 text-sm">{new Date(proof.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-4 bg-[var(--proof-primary)] hover:bg-[var(--proof-primary-hover)] rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2">
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
      </article>
    </div>
  );
}

export function LiveProofsFeed() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProof, setSelectedProof] = useState<any | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  const { data, loading } = useProofs({
    status: 'verified',
    limit: 12,
    platform: activeFilter === 'all' ? undefined : activeFilter,
  });

  const proofs = data?.proofs || [];
  const totalAmount = proofs.reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
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

          <button 
            onClick={() => setIsVerificationModalOpen(true)}
            className="group relative overflow-hidden bg-gradient-to-r from-[var(--proof-primary)] to-[var(--proof-primary-dark)] hover:from-[var(--proof-primary-hover)] hover:to-[var(--proof-primary)] rounded-2xl px-8 py-4 text-white font-semibold transition-all duration-300 shadow-lg shadow-[var(--proof-primary)]/20"
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
        </header>

        <nav className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? "bg-[var(--proof-primary)] text-white"
                  : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--proof-primary)]"></div>
          </div>
        ) : proofs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No proofs found. Be the first to verify a payment!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {proofs.map((proof: any) => (
                <ProofCardComponent
                  key={proof.id}
                  proof={proof}
                  onClick={() => setSelectedProof(proof)}
                />
              ))}
            </div>

            <footer className="mt-8 flex items-center justify-between bg-white border border-transparent rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
                <span className="text-[#6b7b8f] text-sm">Online</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-[#6b7b8f]">
                  <strong className="text-gray-900">{proofs.length}</strong> proofs shown
                </span>
                <span className="text-[#6b7b8f]">
                  Total Volume: <strong className="text-[#00c853]">${totalAmount.toFixed(2)}</strong>
                </span>
              </div>
            </footer>
          </>
        )}
      </div>

      {selectedProof && (
        <ExpandedProofModal
          proof={selectedProof}
          onClose={() => setSelectedProof(null)}
        />
      )}

      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />
    </section>
  );
}
