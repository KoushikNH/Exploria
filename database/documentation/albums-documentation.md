
# EXPLORER – Albums Collection

## Purpose
Stores travel photo albums and memories created by users.

## Features
- Create travel albums.
- Upload and store photo URLs.
- Add captions to photos.
- Save photo locations.
- Connect albums to trips.
- Control public or private visibility.

## Important Fields

| Field | Purpose |
|---|---|
| userId | Album owner |
| tripId | Related trip |
| title | Album name |
| description | Album details |
| photos | Photo metadata |
| photoUrl | Image storage URL |
| caption | Photo description |
| location | Photo location |
| uploadedAt | Upload date |
| isPublic | Album visibility |

## Database Rules
- Every album must belong to a user.
- Photo URLs must be valid.
- Private albums must only be accessible to authorized users.
- Photos should be stored in cloud storage, not directly inside MongoDB.
