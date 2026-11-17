
# EXPLORER – Destinations Collection

## Purpose
Stores information about tourist destinations.

## Features
- Destination name and description
- Category of destination
- City, state and country
- GPS coordinates
- Images and travel information
- Estimated budget and entry fee
- Available facilities

## Categories
- Beach
- Hill Station
- Historical
- Religious
- Adventure
- Nature
- Other

## Important Database Rules
- Destination name is required.
- Coordinates use GeoJSON Point format.
- Coordinates must be stored as [longitude, latitude].
- A 2dsphere index supports nearby destination searches.
- Inactive destinations should not appear in normal discovery results.
