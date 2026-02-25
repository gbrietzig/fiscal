# User Flows

## Flow: Search and View Deputy
**User Goal:** Find a specific deputy and check their latest gas spending.
**Entry Point:** Homepage Search Bar.
**Success Criteria:** Displaying the "Fuel & Lubricants" category in the deputy dashboard.

```mermaid
graph LR
    A[Home] --> B(Type Name)
    B --> C{Select Deputy}
    C --> D[Dashboard]
    D --> E[Scroll to Charts]
    E --> F[Audit Category]
```
