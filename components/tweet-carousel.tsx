"use client";

import { useEffect, useState, useCallback } from "react";

const verifiedTweets = [
  {
    id: 1,
    sender: "CryptoWhale_92",
    senderAvatar: "CW",
    recipient: "MrBeast",
    recipientAvatar: "MB",
    amount: "500.00",
    platform: "GoFundMe",
    campaign: "Team Trees 2.0",
    timestamp: "2m ago",
    fullTimestamp: "Jan 18, 2026 at 2:34 PM",
    txHash: "0x7f3a8b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e91b",
    blockNumber: "19,847,392",
    chain: "Solana",
    comments: 12,
    retweets: 48,
    likes: 156,
    views: "2.4K",
  },
  {
    id: 2,
    sender: "DeFi_Degen",
    senderAvatar: "DD",
    recipient: "Pokimane",
    recipientAvatar: "PK",
    amount: "25.00",
    platform: "Twitch",
    campaign: "Monthly Sub",
    timestamp: "5m ago",
    fullTimestamp: "Jan 18, 2026 at 2:31 PM",
    txHash: "0x2c8d9e1f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9f4a2",
    blockNumber: "19,847,388",
    chain: "Solana",
    comments: 8,
    retweets: 23,
    likes: 89,
    views: "1.1K",
  },
  {
    id: 3,
    sender: "SolanaMaxi",
    senderAvatar: "SM",
    recipient: "Marques",
    recipientAvatar: "MK",
    amount: "100.00",
    platform: "Patreon",
    campaign: "MKBHD Premium",
    timestamp: "8m ago",
    fullTimestamp: "Jan 18, 2026 at 2:28 PM",
    txHash: "0x9e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9db7c3",
    blockNumber: "19,847,381",
    chain: "Solana",
    comments: 34,
    retweets: 112,
    likes: 423,
    views: "8.7K",
  },
  {
    id: 4,
    sender: "ETH_Holder",
    senderAvatar: "EH",
    recipient: "LudwigAhgren",
    recipientAvatar: "LA",
    amount: "50.00",
    platform: "YouTube",
    campaign: "Channel Membership",
    timestamp: "12m ago",
    fullTimestamp: "Jan 18, 2026 at 2:24 PM",
    txHash: "0x4b2a3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0fd8e5",
    blockNumber: "19,847,374",
    chain: "Solana",
    comments: 19,
    retweets: 67,
    likes: 245,
    views: "4.2K",
  },
  {
    id: 5,
    sender: "NFT_Collector",
    senderAvatar: "NC",
    recipient: "CharliDamelio",
    recipientAvatar: "CD",
    amount: "15.00",
    platform: "X Subscriptions",
    campaign: "Premium Content",
    timestamp: "15m ago",
    fullTimestamp: "Jan 18, 2026 at 2:21 PM",
    txHash: "0x1d7c8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5ba9f6",
    blockNumber: "19,847,365",
    chain: "Solana",
    comments: 5,
    retweets: 18,
    likes: 67,
    views: "892",
  },
  {
    id: 6,
    sender: "Web3_Builder",
    senderAvatar: "WB",
    recipient: "GaryVee",
    recipientAvatar: "GV",
    amount: "250.00",
    platform: "Ko-fi",
    campaign: "Business Mentorship",
    timestamp: "18m ago",
    fullTimestamp: "Jan 18, 2026 at 2:18 PM",
    txHash: "0x6f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3c2d8",
    blockNumber: "19,847,358",
    chain: "Solana",
    comments: 27,
    retweets: 89,
    likes: 312,
    views: "5.6K",
  },
  {
    id: 7,
    sender: "TokenTrader",
    senderAvatar: "TT",
    recipient: "Ninja",
    recipientAvatar: "NJ",
    amount: "75.00",
    platform: "Kick",
    campaign: "Stream Support",
    timestamp: "22m ago",
    fullTimestamp: "Jan 18, 2026 at 2:14 PM",
    txHash: "0x8a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1fe1f9",
    blockNumber: "19,847,349",
    chain: "Solana",
    comments: 14,
    retweets: 41,
    likes: 178,
    views: "2.9K",
  },
  {
    id: 8,
    sender: "AltcoinAlpha",
    senderAvatar: "AA",
    recipient: "LinusTech",
    recipientAvatar: "LT",
    amount: "200.00",
    platform: "Patreon",
    campaign: "LTT Supporter",
    timestamp: "25m ago",
    fullTimestamp: "Jan 18, 2026 at 2:11 PM",
    txHash: "0x3c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7bb4a7",
    blockNumber: "19,847,340",
    chain: "Solana",
    comments: 42,
    retweets: 134,
    likes: 521,
    views: "11.2K",
  },
];

type Tweet = typeof verifiedTweets[0];

function VerifiedBadge({ size = "sm" }: { size?: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <svg viewBox="0 0 22 22" className={`${sizeClass} inline-block ml-1`} fill="#1D9BF0">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

function TweetCard({ 
  tweet, 
  isActive, 
  onClick 
}: { 
  tweet: Tweet; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-shrink-0 w-[340px] bg-white border border-transparent rounded-2xl p-4 shadow-none
        transition-all duration-500 ease-out cursor-pointer text-left
        hover:bg-white/90
        ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"}
      `}
    >
      {/* Tweet Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0D8ECF] flex items-center justify-center text-white font-bold text-sm">
          $P
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-900 text-sm">$PROOF&apos;d</span>
            <VerifiedBadge />
          </div>
          <span className="text-gray-500 text-sm">@paymentproofs</span>
        </div>
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1DA1F2]" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Tweet Content */}
      <div className="mb-3">
        <p className="text-gray-900 text-[15px] leading-relaxed">
          <span className="text-[#1DA1F2]">@{tweet.sender}</span>
          {" "}just paid{" "}
          <span className="text-[#1DA1F2]">@{tweet.recipient}</span>
          {" "}
          <span className="text-[#00c853] font-semibold">${tweet.amount}</span>
          {" "}via {tweet.platform}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Campaign: {tweet.campaign}
        </p>
      </div>

      {/* Verification Badge */}
      <div className="bg-[#f0fdf4] border border-[#00c853]/30 rounded-xl p-3 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-[#00c853] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-[#00c853] text-xs font-medium">VERIFIED ON-CHAIN</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-xs font-mono">{tweet.txHash.slice(0, 10)}...{tweet.txHash.slice(-4)}</span>
        </div>
      </div>

      {/* Tweet Footer */}
      <div className="flex items-center justify-between text-gray-500 text-sm">
        <span>{tweet.timestamp}</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z" />
            </svg>
            <span>{tweet.comments}</span>
          </span>
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91z" />
            </svg>
            <span>{tweet.likes}</span>
          </span>
        </div>
      </div>
    </button>
  );
}

function ExpandedTweetModal({ 
  tweet, 
  onClose 
}: { 
  tweet: Tweet; 
  onClose: () => void;
}) {
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-lg bg-white border border-transparent rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors z-10"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Tweet Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0D8ECF] flex items-center justify-center text-white font-bold text-xl">
              $P
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900 text-lg">$PROOF&apos;d</span>
                <VerifiedBadge size="lg" />
              </div>
              <span className="text-[#71767b]">@paymentproofs</span>
            </div>
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1DA1F2]" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
        </div>

        {/* Tweet Content */}
        <div className="p-6">
          <p className="text-gray-900 text-xl leading-relaxed mb-4">
            <span className="text-[#1DA1F2] hover:underline cursor-pointer">@{tweet.sender}</span>
            {" "}just paid{" "}
            <span className="text-[#1DA1F2] hover:underline cursor-pointer">@{tweet.recipient}</span>
            {" "}
            <span className="text-[#00c853] font-bold text-2xl">${tweet.amount}</span>
            {" "}via {tweet.platform}
          </p>
          <p className="text-[#71767b] text-lg mb-4">
            Campaign: <span className="text-gray-900">{tweet.campaign}</span>
          </p>
          <p className="text-[#71767b] text-sm">
            {tweet.fullTimestamp}
          </p>
        </div>

        {/* Verification Section */}
        <div className="mx-6 mb-6 bg-gradient-to-br from-[#0d1a20] to-[#0d1520] border border-[#00c853]/30 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#00c853] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <span className="text-[#00c853] font-bold text-lg block">VERIFIED ON-CHAIN</span>
              <span className="text-[#71767b] text-sm">Transaction confirmed on {tweet.chain}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#71767b] text-sm">Transaction Hash</span>
              <div className="flex items-center gap-2">
                <span className="text-[#1DA1F2] text-sm font-mono">{tweet.txHash.slice(0, 16)}...{tweet.txHash.slice(-8)}</span>
                <button className="text-gray-500 hover:text-gray-900 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#71767b] text-sm">Block Number</span>
              <span className="text-gray-900 text-sm font-mono">{tweet.blockNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#71767b] text-sm">Network</span>
              <span className="text-gray-900 text-sm">{tweet.chain}</span>
            </div>
          </div>

          <button className="w-full mt-4 py-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 rounded-xl text-[#1DA1F2] font-medium transition-colors flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View on Explorer
          </button>
        </div>

        {/* Engagement Stats */}
        <div className="px-6 py-4 border-t border-[#2a3444]">
          <div className="flex items-center gap-6 text-[#71767b]">
            <span><strong className="text-gray-900">{tweet.views}</strong> Views</span>
            <span><strong className="text-gray-900">{tweet.retweets}</strong> Reposts</span>
            <span><strong className="text-gray-900">{tweet.likes}</strong> Likes</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 border-t border-[#2a3444] flex items-center justify-around">
          <button className="flex items-center gap-2 text-[#71767b] hover:text-[#1DA1F2] transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z" />
            </svg>
            <span>Reply</span>
          </button>
          <button className="flex items-center gap-2 text-[#71767b] hover:text-[#00c853] transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
            </svg>
            <span>Repost</span>
          </button>
          <button className="flex items-center gap-2 text-[#71767b] hover:text-[#f91880] transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91z" />
            </svg>
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2 text-[#71767b] hover:text-[#1DA1F2] transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function TweetCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % verifiedTweets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTweetClick = useCallback((tweet: Tweet) => {
    setSelectedTweet(tweet);
  }, []);

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Public Proof on{" "}
            <span className="text-[#1DA1F2]">X</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Every payment is automatically posted to X for full transparency. 
            Your community can verify every transaction in real-time.
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent to-transparent z-10 pointer-events-none" />

        {/* Tweet Track */}
        <div 
          className="flex gap-6 transition-transform duration-700 ease-out px-[calc(50%-170px)]"
          style={{ transform: `translateX(calc(-${currentIndex * 364}px))` }}
        >
          {verifiedTweets.map((tweet, index) => (
            <TweetCard 
              key={tweet.id} 
              tweet={tweet} 
              isActive={index === currentIndex}
              onClick={() => handleTweetClick(tweet)}
            />
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {verifiedTweets.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === currentIndex 
                  ? "w-8 bg-[#1DA1F2]" 
                  : "bg-gray-300 hover:bg-gray-400"
                }
              `}
              aria-label={`Go to tweet ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">24,847</div>
            <div className="text-gray-500 text-sm">Verified Payments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00c853] mb-1">$2.4M</div>
            <div className="text-gray-500 text-sm">Total Verified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1DA1F2] mb-1">100%</div>
            <div className="text-gray-500 text-sm">On-Chain Proof</div>
          </div>
        </div>
      </div>

      {/* Expanded Tweet Modal */}
      {selectedTweet && (
        <ExpandedTweetModal 
          tweet={selectedTweet} 
          onClose={() => setSelectedTweet(null)} 
        />
      )}
    </section>
  );
}
