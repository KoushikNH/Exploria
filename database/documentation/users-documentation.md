
# EXPLORER – Users Collection

## Purpose
Stores account and authentication information for all EXPLORER users.

## User Roles

- tourist – Users who explore destinations and plan trips.
- local_host – Local people who offer experiences.
- admin – Administrators who manage the platform.

## Fields

| Field | Type | Purpose |
|---|---|---|
| _id | ObjectId | Unique user ID |
| name | String | User's full name |
| email | String | Login email |
| passwordHash | String | Hashed password |
| role | String | User account role |
| isVerified | Boolean | Email verification status |
| createdAt | Date | Account creation time |
| updatedAt | Date | Last update time |

## Security

- Never store plain-text passwords.
- Use bcrypt or Argon2 for password hashing in the backend.
- Keep database credentials secret.
- Create a unique index on email.
- Validate user input.
