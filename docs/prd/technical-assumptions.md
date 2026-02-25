# Technical Assumptions

## Repository Structure
- **Monorepo:** Recommended for keeping frontend and data synchronization scripts together.

## Service Architecture
- **Frontend:** Modern JS Framework (React/Vite) with a visualization library (Chart.js/D3.js).
- **Backend:** Node.js (Express or Next.js API routes) for data orchestration.
- **Database/Storage:** Supabase (PostgreSQL) for caching deputy metadata and bulk CEAP records.

## Testing Requirements
- **Unit Testing:** Critical for calculation logic (quota percentages, spending sums).
- **Integration Testing:** Verification of the sync process with the Chamber API.
