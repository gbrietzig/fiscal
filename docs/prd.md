# Fiscal da Cota Parlamentar — PRD (Product Requirements Document)

## 1. Goals and Background Context

### Goals
- **G1:** Enable transparent oversight of legislative spending by simplifying data access.
- **G2:** Provide intuitive visualizations for complex financial data from the Chamber of Deputies.
- **G3:** Automate the detection of spending anomalies and quota proximity.
- **G4:** Establish a scalable foundation for historical legislative auditing.

### Background Context
The project addresses the difficulty citizens face in monitoring the "Cota para o Exercício da Atividade Parlamentar" (CEAP). While data is public via the "Dados Abertos" API, it is often presented in formats that are non-intuitive for non-technical users. **Fiscal** bridges this gap by transforming raw JSON/CSV data into a citizen-centric dashboard with alerts, rankings, and historical comparisons.

### Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2026-02-25 | 1.0 | Initial PRD for MVP and Roadmap | @pm (Orion) |

---

## 2. Requirements

### Functional Requirements
- **FR1:** The system shall allow users to search for deputies by name.
- **FR2:** Display a comprehensive profile for each deputy (Photo, Party, UF, Professions).
- **FR3:** Show the current year's total spending vs. the specific UF quota ceiling.
- **FR4:** Generate a breakdown of expenses by category (Fuel, Travel, etc.) in charts.
- **FR5:** Display a monthly spending timeline for the selected year.
- **FR6:** List all suppliers in a sortable table with CNPJ/CPF and total amounts.
- **FR7:** Flag suppliers that use a CPF (Individual) instead of a CNPJ (Company).
- **FR8:** Alert users when a deputy exceeds 90% of their monthly/yearly quota.
- **FR9:** (V2) Provide rankings for top and bottom spenders across all deputies.
- **FR10:** (V3) Integrate historical bulk data (2008–present) for longitudinal analysis.

### Non-Functional Requirements
- **NFR1:** **Performance:** API responses must be cached locally to ensure page loads under 2s.
- **NFR2:** **Accuracy:** Financial data must match the official source within a 24-hour sync window.
- **NFR3:** **Usability:** The interface must be responsive (mobile-friendly).
- **NFR4:** **Rate Limiting:** The backend must handle API throttling to prevent service interruption.

---

## 3. User Interface Design Goals

### Overall UX Vision
A "Clean & Transparent" interface. Use a high-contrast dark mode or professional light theme with clear typography (e.g., Inter/Roboto). Avoid clutter; focus on the data.

### Core Screens and Views
1.  **Home/Search:** Hero section with search bar and featured rankings.
2.  **Deputy Dashboard:** The main view focusing on profile, charts, and suppliers.
3.  **Global Rankings (V2):** Comparison lists and state-by-state heatmaps.
4.  **Audit Center (V3):** Detailed historical reports and pattern detection logs.

### Target Platforms
- **Web Responsive:** Primarily desktop for detailed analysis, but fully functional on mobile for quick checks.

---

## 4. Technical Assumptions

### Repository Structure
- **Monorepo:** Recommended for keeping frontend and data synchronization scripts together.

### Service Architecture
- **Frontend:** Modern JS Framework (React/Vite) with a visualization library (Chart.js/D3).
- **Backend:** Node.js (Express or Next.js API routes) for data orchestration.
- **Database/Storage:** Supabase (PostgreSQL) for caching deputy metadata and bulk CEAP records.

### Testing Requirements
- **Unit Testing:** Critical for calculation logic (quota percentages, spending sums).
- **Integration Testing:** Verification of the sync process with the Chamber API.

---

## 5. Epic List

- **Epic 1: Project Foundation & Data Sync:** Project setup, database schema, and initial deputy data ingestion.
- **Epic 2: Deputy Profile & Basic Stats:** Implementation of search, deputy profile cards, and total spending summaries.
- **Epic 3: Visualization Dashboards:** Charts for categories, monthly timelines, and supplier lists.
- **Epic 4: Alerts & Auditing (MVP Final):** Implementation of quota alerts and supplier flags.
- **Epic 5: Rankings & Comparative Analytics (V2):** Global lists and party-level averages.

---

## 6. Epic Details

### Epic 1: Project Foundation & Data Sync
*Goal: Establish the technical core and verify the data connection with the Chamber of Deputies.*

**Story 1.1: Environment Setup**
As a developer, I want to initialize the project with Vite/React and Supabase, so that I have a foundation to build features.
- *AC1:* Git repository initialized.
- *AC2:* Supabase project connected and schema created for `deputies` and `expenses`.

**Story 1.2: Deputy Catalog Ingestion**
As the system, I want to fetch and store the basic data of all 513 deputies, so that the search function has immediate data.
- *AC1:* Script successfuly fetches data from `/deputados`.
- *AC2:* Data is stored with fields for ID, Name, Party, UF, and Photo URL.

---

### Epic 2: Deputy Profile & Basic Stats
*Goal: Allow users to find and view a deputy's primary information.*

**Story 2.1: Search Functionality**
As a citizen, I want to search for my deputy by name, so that I can see how they are spending my taxes.
- *AC1:* Search bar filters the local deputy catalog.
- *AC2:* Results show as clickable cards with profile pictures.

**Story 2.2: Spending Overview**
As a citizen, I want to see the total amount spent by a deputy in the current year compared to their state's quota, so that I understand their spending volume.
- *AC1:* UI displays total spent and a progress bar relative to the UF ceiling.
- *AC2:* Ceiling values are pulled from a verified static table.

---

### Epic 3: Visualization Dashboards
*Goal: Turn numeric lists into visual insights.*

**Story 3.1: Expense Categories Chart**
As a user, I want to see a chart of spending by category, so that I can identify which activities take the most resources.
- *AC1:* Data from `/deputados/{id}/despesas` is grouped by `tipoDespesa`.
- *AC2:* A bar or pie chart renders the top categories.

---

## 7. Next Steps
- **UX Expert:** Design the wireframes for the Deputy Dashboard and Search interface.
- **Architect:** Define the specific database schema for the CEAP bulk data and optimized indices for search.

— Orion, orquestrando o sistema 🎯
