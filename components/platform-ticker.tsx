"use client"

import {
  GoFundMeIcon,
  PatreonIcon,
  PayPalIcon,
  CashAppIcon,
  TwitterXIcon,
  TwitchIcon,
  YouTubeIcon,
  VenmoIcon,
  ZelleIcon,
  StripeIcon,
  KoFiIcon,
  BuyMeACoffeeIcon,
  OnlyFansIcon,
  SubstackIcon,
  KickIcon,
  DiscordIcon,
} from './brand-icons'

const platforms = [
  { name: 'YouTube', icon: YouTubeIcon },
  { name: 'Patreon', icon: PatreonIcon },
  { name: 'X Subscriptions', icon: TwitterXIcon },
  { name: 'Twitch', icon: TwitchIcon },
  { name: 'GoFundMe', icon: GoFundMeIcon },
  { name: 'PayPal', icon: PayPalIcon },
  { name: 'Cash App', icon: CashAppIcon },
  { name: 'Venmo', icon: VenmoIcon },
  { name: 'Zelle', icon: ZelleIcon },
  { name: 'Stripe', icon: StripeIcon },
  { name: 'Ko-fi', icon: KoFiIcon },
  { name: 'Buy Me a Coffee', icon: BuyMeACoffeeIcon },
  { name: 'OnlyFans', icon: OnlyFansIcon },
  { name: 'Substack', icon: SubstackIcon },
  { name: 'Kick', icon: KickIcon },
  { name: 'Discord', icon: DiscordIcon },
]

export function PlatformTicker() {
  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-transparent to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-transparent to-transparent" />
      
      {/* Ticker track */}
      <div className="flex animate-ticker">
        {/* First set */}
        {platforms.map((platform, index) => (
          <div
            key={`first-${index}`}
            className="mx-4 flex shrink-0 items-center gap-3 rounded-2xl border border-transparent bg-white px-5 py-3 shadow-none transition-colors hover:bg-white/90"
          >
            <platform.icon className="h-10 w-10" />
            <span className="whitespace-nowrap text-sm font-medium text-gray-700">{platform.name}</span>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {platforms.map((platform, index) => (
          <div
            key={`second-${index}`}
            className="mx-4 flex shrink-0 items-center gap-3 rounded-2xl border border-transparent bg-white px-5 py-3 shadow-none transition-colors hover:bg-white/90"
          >
            <platform.icon className="h-10 w-10" />
            <span className="whitespace-nowrap text-sm font-medium text-gray-700">{platform.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
