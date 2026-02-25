# Database Schema (PostgreSQL)

```sql
-- Tables
CREATE TABLE deputies (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    party TEXT,
    state CHAR(2),
    photo_url TEXT,
    metadata JSONB
);

CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deputy_id INTEGER REFERENCES deputies(id),
    category TEXT,
    supplier_name TEXT,
    supplier_id TEXT, -- CNPJ or CPF
    supplier_type SMALLINT, -- 1-CNPJ, 2-CPF
    net_value NUMERIC(12,2),
    glosed_value NUMERIC(12,2),
    issue_date DATE,
    sync_source TEXT -- 'api' or 'bulk'
);

-- Indices for performance
CREATE INDEX idx_expenses_deputy_date ON expenses(deputy_id, issue_date);
CREATE INDEX idx_expenses_supplier ON expenses(supplier_id);
```
