-- Initial Schema for Fiscal project

-- Deputies Table
CREATE TABLE IF NOT EXISTS public.deputies (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    party TEXT,
    state CHAR(2),
    photo_url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expenses Table
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deputy_id INTEGER REFERENCES public.deputies(id) ON DELETE CASCADE,
    category TEXT,
    supplier_name TEXT,
    supplier_id TEXT, -- CNPJ or CPF
    supplier_type SMALLINT, -- 1-CNPJ, 2-CPF
    net_value NUMERIC(12,2),
    glosed_value NUMERIC(12,2),
    issue_date DATE,
    sync_source TEXT, -- 'api' or 'bulk'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_expenses_deputy_date ON public.expenses(deputy_id, issue_date);
CREATE INDEX IF NOT EXISTS idx_expenses_supplier ON public.expenses(supplier_id);

-- Enable RLS
ALTER TABLE public.deputies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for MVP)
CREATE POLICY "Public Read Access for Deputies" ON public.deputies FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Expenses" ON public.expenses FOR SELECT USING (true);
