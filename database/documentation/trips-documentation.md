
# EXPLORER – Trips Collection

## Purpose
Stores travel plans created by tourists.

## Features
- Create travel plans.
- Add multiple destinations.
- Set travel dates.
- Specify number of travelers.
- Set estimated trip budget.
- Track trip progress.

## Trip Status
- planned
- ongoing
- completed
- cancelled

## Database Rules
- Every trip must belong to a valid user.
- End date must be after start date.
- Number of travelers must be greater than zero.
- Budget cannot be negative.
- Destination IDs must reference valid destinations.
