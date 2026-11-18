🌍 EXPLORER – Discover Beyond Destinations

EXPLORER is a travel discovery and management platform that helps users explore destinations, discover local experiences, connect with hosts, manage trips, and share travel memories.

✨ Features

- User Authentication – Secure registration and login
- Destination Discovery – Explore tourist destinations and attractions
- Local Experiences – Discover unique activities
- Host Profiles – Connect with local hosts
- Trip Management – Create and manage travel plans
- Booking Management – Manage travel bookings
- Expense Tracking – Track trip expenses
- Travel Memories – Save and share memories
- Events – Discover travel-related events
- Photo Uploads – Upload and manage travel images

🛠️ Technology Stack

Component| Technologies
Frontend| HTML, CSS, JavaScript
Backend| Node.js, Express.js, REST APIs
Database| MongoDB, Mongoose, MongoDB Atlas
Authentication| JWT, bcryptjs
Additional Tools| Git, GitHub, Cloudinary, Multer

📁 Project Structure

Exploria/
├── frontend/
│   └── index.html
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── BACKEND/
│   └── AI_BACKEND/
└── README.md

⚙️ Installation and Setup

1. Clone the Repository

git clone https://github.com/KoushikNH/Exploria.git
cd Exploria

2. Install Dependencies

cd backend
npm install

3. Configure Environment Variables

Create a ".env" file inside the "backend" directory.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Add any additional Cloudinary credentials required by the project.

Security: Never upload your actual ".env" file, passwords, API keys, or database credentials to GitHub.

4. Start the Backend

npm run dev

Or:

npm start

Backend URL: "http://localhost:5000"

5. Open the Frontend

Open "frontend/index.html" in your browser, or access it through the running backend.

🔗 API Endpoints

Module| Endpoint
Authentication| "/api/auth"
Profiles| "/api/profiles"
Destinations| "/api/destinations"
Experiences| "/api/experiences"
Bookings| "/api/bookings"
Trips| "/api/trips"
Expenses| "/api/expenses"
Hosts| "/api/hosts"
Admin| "/api/admin"
Memories| "/api/memories"
Events| "/api/events"

🗄️ Database

The project uses MongoDB to store:

- User and authentication data
- Tourist and host profiles
- Destinations and experiences
- Bookings and trips
- Expenses and travel memories
- Events and related information

👨‍💻 Development

This project is developed collaboratively using Git and GitHub.

Development is managed through feature branches, integration branches, and pull requests.

🎯 Project Objective

To make travel discovery easier by connecting travelers with destinations, local experiences, and travel communities through one platform.

---

EXPLORER – Discover Beyond Destinations. 🌍