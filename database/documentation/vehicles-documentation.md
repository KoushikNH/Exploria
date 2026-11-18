
# EXPLORER – Vehicles Collection

## Purpose
Stores vehicle listings available for tourists.

## Vehicle Types
- Bike
- Scooter
- Car
- SUV
- Van

## Important Fields

| Field | Purpose |
|---|---|
| ownerId | Vehicle owner's user ID |
| vehicleName | Vehicle name |
| vehicleType | Type of vehicle |
| registrationNumber | Vehicle registration |
| capacity | Passenger capacity |
| pricePerDay | Daily rental price |
| fuelType | Fuel information |
| city | Vehicle location |
| features | Available features |
| images | Vehicle photos |
| isAvailable | Availability status |

## Database Rules
- Every vehicle must have an owner.
- Registration number should be unique.
- Capacity must be greater than zero.
- Rental price cannot be negative.
- Only available vehicles should appear in normal searches.
