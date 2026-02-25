# Requirements

## Functional Requirements
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

## Non-Functional Requirements
- **NFR1:** **Performance:** API responses must be cached locally to ensure page loads under 2s.
- **NFR2:** **Accuracy:** Financial data must match the official source within a 24-hour sync window.
- **NFR3:** **Usability:** The interface must be responsive (mobile-friendly).
- **NFR4:** **Rate Limiting:** The backend must handle API throttling to prevent service interruption.
