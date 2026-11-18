
# EXPLORER – Events Collection

## Purpose
Stores local festivals, cultural programs and tourist events.

## Examples
- Food festivals
- Music events
- Cultural programs
- Religious festivals
- Local celebrations

## Important Fields

| Field | Purpose |
|---|---|
| title | Event name |
| description | Event details |
| category | Event type |
| organizerId | Event organizer |
| location | Event venue and coordinates |
| startDate | Event starting time |
| endDate | Event ending time |
| entryFee | Ticket price |
| images | Event photos |
| isActive | Event status |

## Database Rules
- Event title is required.
- End date must be after start date.
- Entry fee cannot be negative.
- Location coordinates use GeoJSON.
- Expired events should not appear in upcoming events.
