
# EXPLORER – Bookings Collection

## Purpose
Stores reservations made by tourists.

## Booking Types
- Vehicle booking
- Experience booking

## Booking Status
- pending
- confirmed
- cancelled
- completed

## Payment Status
- unpaid
- paid
- refunded

## Important Fields

| Field | Purpose |
|---|---|
| userId | User making the booking |
| bookingType | Vehicle or experience |
| itemId | Booked item ID |
| startDate | Booking start |
| endDate | Booking end |
| numberOfPeople | Number of participants |
| totalAmount | Total booking cost |
| bookingStatus | Reservation status |
| paymentStatus | Payment status |

## Database Rules
- Every booking must belong to a valid user.
- Booking dates must be valid.
- Number of people must be greater than zero.
- Total amount cannot be negative.
- Prevent overlapping vehicle reservations.
- Verify payment before marking it paid.
