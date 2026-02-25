# External APIs

## Câmara dos Deputados (Dados Abertos)
- **Base URL:** `https://dadosabertos.camara.leg.br/api/v2`
- **Endpoints:**
  - `GET /deputados`: List available deputies.
  - `GET /deputados/{id}/despesas`: Real-time expenses (last 6 months).
  - `Bulk Data`: Hourly/Monthly CSV files for historical series.
- **Constraints:** Rate limit applies. Cache headers must be respected.
