# Project Brief: Fiscal da Cota Parlamentar

## Executive Summary
**Fiscal da Cota Parlamentar** is a transparency and auditing tool designed to monitor, analyze, and visualize expenses from Brazilian Federal Deputies. Utilizing the official "Dados Abertos" API from the Chamber of Deputies, the platform transforms raw legislative data into actionable insights for citizens, researchers, and journalists, promoting governmental accountability.

## Problem Statement
The Chamber of Deputies' data is public but often difficult for the average citizen to consume and analyze effectively. Current official portals can be technical and lack advanced visual analytics, comparative tools between lawmakers, and proactive alerting for suspicious spending patterns. This creates a barrier to effective public oversight of the "Cota para o Exercício da Atividade Parlamentar" (CEAP).

## Proposed Solution
A modern web application that provides:
- User-friendly search and intuitive profiles for all 513 deputies.
- Real-time expense tracking with categorical breakdowns and visual dashboards.
- Comparative rankings and state-by-state heatmaps.
- Advanced pattern detection and historical analysis using bulk data (CEAP).
- PROactive alerts for "edge case" spending (e.g., nearing quotas, private individual suppliers).

## Target Users
1. **Engaged Citizens:** Individuals interested in how their representatives spend public funds.
2. **Journalists/Researchers:** Professionals looking for data-driven stories or academic research on legislative spending.
3. **Public Policy Watchdogs:** NGOs and collectives focused on transparency and anti-corruption.

## Goals & Success Metrics
- **Objective 1:** Provide 100% visibility into current year CEAP expenses for all active deputies.
- **Objective 2:** Implement advanced filtering and ranking (V2) to identify top spenders by category.
- **Objective 3:** Enable historical audits (V3) covering the 2008–present period.
- **Success Metric:** Accuracy and speed of data synchronization with the official Chamber API.

## MVP Scope (Phase 1)
- **Search & Profile:** Find deputies by name; display profile photos, party, state, and professions.
- **Expense Dashboard:** Total yearly spending vs. State-specific quota threshold.
- **Categorical Breakdown:** Visual charts for fuel, travel, office supplies, etc.
- **Monthly Timeline:** Line graphs showing monthly spending trends.
- **Supplier List:** Sorted table of providers with CNPJ/CPF identification.
- **Basic Alerta:** 90% quota threshold alerts and Individual (CPF) supplier flags.

## Post-MVP Vision (V2 & V3)
### Phase 2: Rankings & Comparisons
- Top 10/Bottom 10 spenders ranking.
- Party-level spending averages.
- National heatmap of average spending by state.

### Phase 3: Historical & Advanced Analysis
- 15-year series analysis using bulk CEAP files.
- Inflation-adjusted (IPCA) cost evolution.
- Conflict of interest / suspicious pattern detection (HHI index, recurring identical values).

## Technical Considerations
- **Data Source:** [dadosabertos.camara.leg.br](https://dadosabertos.camara.leg.br/swagger/api.html) (REST API + Bulk Downloads).
- **Backend:** Node.js for API consumption and data processing.
- **Database:** Required for caching API responses and storing bulk historical data (Supabase/PostgreSQL recommended).
- **Frontend:** Modern Javascript framework with advanced visualization libraries (e.g., Chart.js, D3.js).
- **Constraints:**
  *   **Teto da Cota:** Not available via API; requires manual/static table implementation per UF.
  *   **Rate Limits:** Implementation of local caching is mandatory to avoid API throttling.
  *   **Sync Frequency:** Daily updates are sufficient (data is not real-time).

## Constraints & Assumptions
- **Budget:** $0.00 (Standard AIOS development).
- **Timeline:** 1-2 weeks for MVP, 4+ weeks for full V3 implementation.
- **Assumption:** The Chamber of Deputies maintains API availability and data schema consistency.

## Risks & Open Questions
- **Risk:** API schema changes without notice (mitigated via robust error handling).
- **Open Question:** Will the 15-year bulk data volume require specialized Big Data processing?
- **Research Area:** Legal implications of "Suspicious Pattern Detection" nomenclature (use "Anomalies" or "Alerts" instead).

## Next Steps
1. **PM Handoff:** Proceed to create the Product Requirements Document (PRD).
2. **Technical Setup:** Finalize GitHub CLI installation and project repository.
3. **Architecture:** Define the data ingestion strategy (API vs. Bulk).

— Orion, orquestrando o sistema 🎯
