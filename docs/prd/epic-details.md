# Epic Details

## Epic 1: Project Foundation & Data Sync
*Goal: Establish the technical core and verify the data connection with the Chamber of Deputies.*

### Story 1.1: Environment Setup
As a developer, I want to initialize the project with Vite/React and Supabase, so that I have a foundation to build features.
- *AC1:* Git repository initialized.
- *AC2:* Supabase project connected and schema created for `deputies` and `expenses`.

### Story 1.2: Deputy Catalog Ingestion
As the system, I want to fetch and store the basic data of all 513 deputies, so that the search function has immediate data.
- *AC1:* Script successfuly fetches data from `/deputados`.
- *AC2:* Data is stored with fields for ID, Name, Party, UF, and Photo URL.

## Epic 2: Deputy Profile & Basic Stats
*Goal: Allow users to find and view a deputy's primary information.*

### Story 2.1: Search Functionality
As a citizen, I want to search for my deputy by name, so that I can see how they are spending my taxes.
- *AC1:* Search bar filters the local deputy catalog.
- *AC2:* Results show as clickable cards with profile pictures.

### Story 2.2: Spending Overview
As a citizen, I want to see the total amount spent by a deputy in the current year compared to their state's quota, so that I understand their spending volume.
- *AC1:* UI displays total spent and a progress bar relative to the UF ceiling.
- *AC2:* Ceiling values are pulled from a verified static table.

## Epic 3: Visualization Dashboards
*Goal: Turn numeric lists into visual insights.*

### Story 3.1: Expense Categories Chart
As a user, I want to see a chart of spending by category, so that I can identify which activities take the most resources.
- *AC1:* Data from `/deputados/{id}/despesas` is grouped by `tipoDespesa`.
- *AC2:* A bar or pie chart renders the top categories.
