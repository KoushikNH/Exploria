
# EXPLORER – Profiles Collection

## Purpose
Stores additional information about tourists and local hosts.

## Relationship
Each profile belongs to one user through `userId`, which references `users._id`.

## Profile Types

- tourist – Travel interests, languages and personal details.
- local_host – Local information, languages and hosting details.

## Fields

| Field | Type | Purpose |
|---|---|---|
| _id | ObjectId | Unique profile ID |
| userId | ObjectId | Reference to users collection |
| profileType | String | Tourist or local host |
| phone | String | Contact number |
| profilePhoto | String | Profile image URL |
| bio | String | Short introduction |
| city | String | Current city |
| country | String | Country |
| languages | Array | Languages spoken |
| interests | Array | User interests |
| createdAt | Date | Creation date |
| updatedAt | Date | Last update |

## Database Rules

- Each user can have one profile.
- userId must be unique.
- userId must reference an existing user.
- Validate profile information before saving.
