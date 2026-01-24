-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_address TEXT,
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create platforms table
CREATE TABLE IF NOT EXISTS public.platforms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create proofs table
CREATE TABLE IF NOT EXISTS public.proofs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL,
  recipient TEXT NOT NULL,
  amount DECIMAL(18, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  platform_id UUID NOT NULL,
  campaign_name TEXT NOT NULL,
  tx_hash TEXT NOT NULL,
  block_number TEXT NOT NULL,
  chain TEXT DEFAULT 'Solana',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('verified', 'pending', 'disputed')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  CONSTRAINT proofs_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT proofs_platform_id_fkey FOREIGN KEY (platform_id) REFERENCES public.platforms(id) ON DELETE RESTRICT
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proof_id UUID,
  buyer_wallet TEXT NOT NULL,
  seller_wallet TEXT NOT NULL,
  amount DECIMAL(18, 2) NOT NULL,
  currency TEXT DEFAULT 'USDC',
  streamflow_id TEXT,
  escrow_status TEXT NOT NULL DEFAULT 'locked' CHECK (escrow_status IN ('locked', 'released', 'disputed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  released_at TIMESTAMPTZ,
  CONSTRAINT transactions_proof_id_fkey FOREIGN KEY (proof_id) REFERENCES public.proofs(id) ON DELETE SET NULL
);

-- Create evidence table
CREATE TABLE IF NOT EXISTS public.evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID NOT NULL,
  uploaded_by UUID NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT evidence_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE,
  CONSTRAINT evidence_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Create disputes table
CREATE TABLE IF NOT EXISTS public.disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID NOT NULL,
  opened_by UUID NOT NULL,
  reason TEXT NOT NULL,
  realms_proposal_id TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'voting', 'resolved', 'cancelled')),
  resolution TEXT CHECK (resolution IN ('buyer', 'seller')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  CONSTRAINT disputes_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE,
  CONSTRAINT disputes_opened_by_fkey FOREIGN KEY (opened_by) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Create votes table
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dispute_id UUID NOT NULL,
  voter_wallet TEXT NOT NULL,
  vote TEXT NOT NULL CHECK (vote IN ('buyer', 'seller')),
  token_amount DECIMAL(18, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT votes_dispute_id_fkey FOREIGN KEY (dispute_id) REFERENCES public.disputes(id) ON DELETE CASCADE,
  UNIQUE(dispute_id, voter_wallet)
);

-- Create verification_requests table
CREATE TABLE IF NOT EXISTS public.verification_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token_holdings TEXT NOT NULL,
  telegram_username TEXT NOT NULL,
  service TEXT NOT NULL CHECK (service IN ('Payroll', 'Tokenization', 'Spending')),
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- Create indexes for better query performance
CREATE INDEX idx_proofs_sender_id ON public.proofs(sender_id);
CREATE INDEX idx_proofs_platform_id ON public.proofs(platform_id);
CREATE INDEX idx_proofs_status ON public.proofs(status);
CREATE INDEX idx_proofs_featured ON public.proofs(featured);
CREATE INDEX idx_proofs_created_at ON public.proofs(created_at DESC);
CREATE INDEX idx_transactions_buyer_wallet ON public.transactions(buyer_wallet);
CREATE INDEX idx_transactions_seller_wallet ON public.transactions(seller_wallet);
CREATE INDEX idx_transactions_escrow_status ON public.transactions(escrow_status);
CREATE INDEX idx_disputes_transaction_id ON public.disputes(transaction_id);
CREATE INDEX idx_disputes_status ON public.disputes(status);
CREATE INDEX idx_votes_dispute_id ON public.votes(dispute_id);
CREATE INDEX idx_evidence_transaction_id ON public.evidence(transaction_id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for platforms (public read, admin write)
CREATE POLICY "Platforms are viewable by everyone"
  ON public.platforms FOR SELECT
  USING (true);

-- RLS Policies for proofs (public read, authenticated write)
CREATE POLICY "Proofs are viewable by everyone"
  ON public.proofs FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create proofs"
  ON public.proofs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own proofs"
  ON public.proofs FOR UPDATE
  USING (auth.uid() = sender_id);

-- RLS Policies for transactions
CREATE POLICY "Users can view their transactions"
  ON public.transactions FOR SELECT
  USING (
    auth.uid()::text IN (
      SELECT id::text FROM public.profiles 
      WHERE wallet_address IN (buyer_wallet, seller_wallet)
    )
  );

CREATE POLICY "Authenticated users can create transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for evidence
CREATE POLICY "Users can view evidence for their transactions"
  ON public.evidence FOR SELECT
  USING (
    transaction_id IN (
      SELECT id FROM public.transactions 
      WHERE auth.uid()::text IN (
        SELECT id::text FROM public.profiles 
        WHERE wallet_address IN (buyer_wallet, seller_wallet)
      )
    )
  );

CREATE POLICY "Users can upload evidence for their transactions"
  ON public.evidence FOR INSERT
  WITH CHECK (
    transaction_id IN (
      SELECT id FROM public.transactions 
      WHERE auth.uid()::text IN (
        SELECT id::text FROM public.profiles 
        WHERE wallet_address IN (buyer_wallet, seller_wallet)
      )
    )
  );

-- RLS Policies for disputes (public read for voting)
CREATE POLICY "Disputes are viewable by everyone"
  ON public.disputes FOR SELECT
  USING (true);

CREATE POLICY "Transaction parties can create disputes"
  ON public.disputes FOR INSERT
  WITH CHECK (
    transaction_id IN (
      SELECT id FROM public.transactions 
      WHERE auth.uid()::text IN (
        SELECT id::text FROM public.profiles 
        WHERE wallet_address IN (buyer_wallet, seller_wallet)
      )
    )
  );

-- RLS Policies for votes (public read, authenticated write)
CREATE POLICY "Votes are viewable by everyone"
  ON public.votes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can vote"
  ON public.votes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for verification_requests (insert only, no read for privacy)
CREATE POLICY "Anyone can submit verification requests"
  ON public.verification_requests FOR INSERT
  WITH CHECK (true);

-- Insert default platforms
INSERT INTO public.platforms (name, slug) VALUES
  ('GoFundMe', 'gofundme'),
  ('Patreon', 'patreon'),
  ('PayPal', 'paypal'),
  ('Twitch', 'twitch'),
  ('YouTube', 'youtube'),
  ('X Subscriptions', 'x-subscriptions'),
  ('Venmo', 'venmo'),
  ('Ko-fi', 'kofi'),
  ('Kick', 'kick'),
  ('Cash App', 'cashapp'),
  ('Zelle', 'zelle'),
  ('Stripe', 'stripe'),
  ('Buy Me a Coffee', 'buymeacoffee'),
  ('OnlyFans', 'onlyfans'),
  ('Substack', 'substack'),
  ('Discord', 'discord')
ON CONFLICT (slug) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proofs_updated_at BEFORE UPDATE ON public.proofs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
