ALTER TABLE public.transactions
  ADD COLUMN category TEXT,
  ADD COLUMN title TEXT,
  ADD COLUMN metadata JSONB;
