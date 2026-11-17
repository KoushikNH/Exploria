
# EXPLORER – Expenses Collection

## Purpose
Tracks individual and shared travel expenses.

## Expense Categories
- Food
- Transport
- Accommodation
- Tickets
- Shopping
- Other

## Important Fields

| Field | Purpose |
|---|---|
| tripId | Related trip |
| paidBy | User who paid |
| description | Expense details |
| category | Expense type |
| amount | Expense amount |
| splitBetween | Users sharing the cost |
| expenseDate | Date of expense |

## Database Rules
- Every expense must belong to a valid trip.
- Amount must be greater than zero.
- PaidBy must reference a valid user.
- Split users must belong to the trip.
- Group expense calculations should be handled by the backend.
