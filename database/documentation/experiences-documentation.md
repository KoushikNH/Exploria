
# EXPLORER – Experiences Collection

## Purpose
Stores activities and experiences offered by local hosts.

## Examples
- Traditional food tours
- Trekking
- Sightseeing
- Cultural activities
- Local village experiences

## Important Fields

| Field | Purpose |
|---|---|
| hostId | Identifies the local host |
| destinationId | Links the experience to a destination |
| title | Experience name |
| description | Activity details |
| category | Experience type |
| pricePerPerson | Cost per person |
| durationHours | Activity duration |
| maxParticipants | Maximum group size |
| languages | Languages supported |
| images | Experience photos |
| isActive | Availability status |

## Database Rules
- Every experience must have a host.
- Destination reference must be valid when provided.
- Price cannot be negative.
- Maximum participants must be greater than zero.
- Inactive experiences should not appear in normal searches.
