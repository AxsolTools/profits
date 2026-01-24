# $PROOF - Decentralized Escrow Platform

A Next.js-based escrow platform built on Solana, integrating Streamflow for non-custodial escrow and Realms for decentralized governance.

## Features

- **Non-Custodial Escrow**: Funds locked on-chain via Streamflow, platform doesn't control them
- **Decentralized Dispute Resolution**: PROOF token holders vote on disputes via Realms governance
- **Real-Time Verification**: All proofs visible on-chain and posted to X
- **Multi-Platform Support**: 100+ platforms (GoFundMe, Patreon, Twitch, YouTube, etc.)
- **Accessibility First**: Full reduced-motion support, semantic HTML, ARIA labels

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling with CSS variables
- **Radix UI** - Accessible component primitives
- **Supabase Client** - Real-time database and auth

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Supabase** - PostgreSQL database, RLS, storage
- **Zod** - Schema validation
- **Streamflow API** - Escrow management (integration ready)
- **Realms API** - Governance proposals (integration ready)

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account
- (Optional) Streamflow and Realms API keys

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/payment-proofs-website.git
cd payment-proofs-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: Streamflow & Realms integrations
STREAMFLOW_API_KEY=your_streamflow_api_key
REALMS_PROGRAM_ID=your_realms_program_id
PROOF_TOKEN_MINT=your_proof_token_mint_address
```

4. Run the Supabase migration:
```bash
# If using Supabase CLI
supabase db push

# Or manually run the SQL from supabase/migrations/0001_proof_core.sql
```

5. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/              # Next.js API routes
│   │   ├── proofs/       # Proof CRUD + stats
│   │   ├── transactions/ # Escrow creation
│   │   ├── disputes/     # Dispute management
│   │   ├── votes/        # Voting on disputes
│   │   ├── evidence/     # File uploads
│   │   └── webhooks/     # Streamflow webhooks
│   ├── globals.css       # Global styles + CSS variables
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/              # Radix UI primitives
│   └── *.tsx            # Feature components
├── hooks/               # Custom React hooks
│   ├── use-proofs.ts    # Proof data fetching
│   └── use-reduced-motion.ts  # A11y motion hook
├── lib/
│   ├── api.ts           # API client utilities
│   ├── supabase/        # Supabase clients
│   ├── validations/     # Zod schemas
│   └── types/           # TypeScript types
└── supabase/
    └── migrations/      # Database schema

## API Routes

### Proofs
- `GET /api/proofs` - List proofs (supports pagination, filters)
- `POST /api/proofs` - Create a new proof (authenticated)
- `GET /api/proofs/[id]` - Get single proof
- `GET /api/proofs/stats` - Get aggregated stats

### Transactions
- `POST /api/transactions` - Create escrow transaction (authenticated)

### Disputes
- `POST /api/disputes` - Open a dispute (authenticated)

### Votes
- `POST /api/votes` - Vote on a dispute (authenticated, token holders only)

### Evidence
- `POST /api/evidence` - Upload evidence file (authenticated)

### Verification Requests
- `POST /api/verification-requests` - Submit verification form

### Webhooks
- `POST /api/webhooks/streamflow` - Streamflow escrow status updates

## Database Schema

### Core Tables
- `profiles` - User profiles (linked to auth)
- `platforms` - Supported payment platforms
- `proofs` - Verified payment proofs
- `transactions` - Escrow transactions
- `disputes` - Dispute records
- `votes` - Dispute votes
- `evidence` - File evidence for disputes
- `verification_requests` - Form submissions

All tables have Row Level Security (RLS) policies enabled.

## Design System

### CSS Variables
All colors use CSS variables for easy theming:
- `--proof-primary`: #1DA1F2 (brand blue)
- `--proof-accent`: #4ECDC4 (teal)
- `--proof-success`: #00c853 (green)
- `--proof-warning`: #ff9800 (orange)

### Spacing
Based on 8px grid system:
- `--spacing-1`: 8px
- `--spacing-2`: 16px
- `--spacing-3`: 24px
- etc.

### Accessibility
- All animations respect `prefers-reduced-motion`
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on interactive elements
- Keyboard navigation support

## Deployment

### DigitalOcean + GitHub

1. Push your code to GitHub
2. Connect your DigitalOcean App Platform to the repository
3. Set environment variables in DigitalOcean dashboard
4. Deploy!

Build command: `pnpm build`
Run command: `pnpm start`

## Roadmap

### Phase 1 (MVP) - Current
- ✅ Basic escrow for physical goods
- ✅ Realms voting integration (structure ready)
- ✅ Evidence upload system
- 🔄 Streamflow API integration (ready to connect)
- 🔄 Realms API integration (ready to connect)

### Phase 2
- Service categories (freelancing, consulting)
- Enhanced evidence (tracking API integration)
- Reputation scores

### Phase 3
- Multi-party escrow
- Milestone-based releases
- Automated oracle verification

### Phase 4
- Mobile app
- Fiat on/off ramps
- Enterprise API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

- Email: Support@Gotproof.xyz
- Docs: https://docs.gotproof.xyz
- Twitter: https://twitter.com/paymentproofs
