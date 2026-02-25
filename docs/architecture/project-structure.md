# Unified Project Structure

```plaintext
fiscal/
├── .aios/                   # Framework Config
├── docs/                    # PRD, Architecture, Specs
├── src/
│   ├── apps/
│   │   ├── frontend/        # React/Vite App
│   │   │   ├── components/  # UI Elements (Charts, Cards)
│   │   │   ├── services/    # API Clients (Câmara SDK)
│   │   │   └── hooks/       # useExpenses, useDeputies
│   │   └── functions/       # Supabase Edge Functions
│   │       ├── sync-api/    # Daily cron job
│   │       └── auth/        # Optional auth logic
│   ├── packages/
│   │   ├── shared/          # Shared interfaces & types
│   │   └── constants/       # UF Quota Table
├── .env.example
├── package.json
└── README.md
```
