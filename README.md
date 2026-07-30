# Car Dealership App

A full-stack Car Dealership Management System built using Node.js, Express.js, SQLite, and Vanilla JavaScript. The application allows users to browse available cars, register/login securely using JWT authentication, and book test drives. It also provides administrative APIs for managing vehicles and bookings.

# Project Overview
This project was developed as part of a software development assignment to demonstrate backend API development, authentication, database management, frontend integration, and Git-based development workflow.

The application supports:

i) Secure User Authentication
ii) Car Inventory Management
iii) Vehicle Management
iv) Test Drive Booking System
v) SQLite Database Integration
vi) RESTful APIs
vii) Responsive Frontend

# Features

i)Authentication :

- User registration
- User Login
- JWT Authentication
- Protected Routes
- Role-based Authorization

ii)Car Management :

- View all Cars
- View Car Details
- Search & Filter Cars
- Create Car (Admin)
- Update Car (Admin)
- Delete Car (Admin)

iii)Booking Module :

- Book Test Drive
- View My Bookings
- View All Bookings (Admin)
- Update Booking Status
- Cancel Booking

iv)Frontend

- Login Page
- Register Page
- Car Listing
- Car Details
- Booking Form
- Admin Dashboard

# Tech Stack

i)Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- JWT
- bcryptjs

ii)Frontend
- HTML5
- CSS3
- Vanilla JavaScript

iii)Tools
- Git
- GitHub
- VS Code
- Thunder Client

## Project Structure


backend/
 ├── config/
 ├── controllers/
 ├── database/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── server.js

frontend/
 ├── index.html
 ├── style.css
 ├── app.js

 README.md
PROMPTS.md


## Requirements

- Node.js 18 or newer
- npm

## Setup

1. Clone Repository

git clone <repository-url>
cd car-dealership8

2. Backend Setup

cd backend
npm install
npm run dev

Backend runs on -> http://localhost:5000

3. Frontend Setup

open -> frontend/index.html

4. Environment Variables

PORT=5000
JWT_SECRET=your_secret_key
DB_PATH=./database/car_deal.db

## API Documentation

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Example login payload:

```json
{
	"email": "user@example.com",
	"password": "secret123"
}
```

### Cars

- `GET /api/cars`
- `GET /api/cars/:id`
- `POST /api/cars` protected, admin only
- `PUT /api/cars/:id` protected, admin only
- `DELETE /api/cars/:id` protected, admin only

Query filters supported by `GET /api/cars`:

- `search`
- `brand`
- `model`
- `fuelType`
- `transmission`
- `minPrice`
- `maxPrice`
- `year`
- `minYear`
- `maxYear`

### Bookings

- `POST /api/bookings`
- `GET /api/bookings/my`
- `GET /api/bookings` protected, admin only
- `PUT /api/bookings/:id/status` protected, admin only
- `DELETE /api/bookings/:id`

### Vehicles

- `GET /api/vehicles`
- `GET /api/vehicles/:id`
- `POST /api/vehicles` protected, admin only
- `PUT /api/vehicles/:id` protected, admin only
- `DELETE /api/vehicles/:id` protected, admin only

## Frontend Pages

- Login
- Register
- Car Listing
- Car Details
- Book Test Drive
- Admin Dashboard

## Screenshots

Add screenshots here after running the app:

- after Login interface page(actually it does not have pop up showing logged in succesfully ):![alt text](<Screenshot 2026-07-30 150305.png>)  

- Register page: `screenshots/register.png` ![alt text](<Screenshot 2026-07-30 150217.png>)

- Car listing:  ![alt text](<Screenshot 2026-07-30 195722.png>)

- Car details: ![alt text](<Screenshot 2026-07-30 195736.png>)


- Booking form:![alt text](<Screenshot 2026-07-30 195750-1.png>)
- Admin dashboard: ![alt text](<Screenshot 2026-07-30 195839.png>)

## Notes

- Authentication uses JWT bearer tokens in the `Authorization` header.
- SQLite data is stored in `backend/database/car_deal.db` by default.
- The frontend currently expects the backend to run at `http://localhost:5000`.

## Testing
Manual Testing Performed

Module	                         Status
User Registration	             Passed
User Login	                     Passed
JWT Authentication             	 Passed
Get All Cars	                 Passed
Get Car By ID	                 Passed
Car Search	                     Passed
Book Test Drive               	 Passed
View Bookings	                 Passed
Admin Vehicle APIs           	 Passed
 
 NOTE :Functional API testing was performed using Thunder Client during development.

 ## My AI Usage

1. ChatGPT

Used for:

- Backend architecture planning
- Express project structure guidance
- API design suggestions
- Documentation preparation
- Code explanation and debugging assistance

2. GitHub Copilot

Used for:

- Generating repetitive boilerplate
- Completing repetitive CRUD logic
- Assisting while writing frontend JavaScript

3. Cursor AI

Used for:

- Backend implementation
- SQLite integration
- CRUD scaffolding
- Route generation

4. Claude

Used for:

- Debugging Express routes
- Identifying routing issues
- Reviewing backend files
- Finding inconsistencies during development

5. Codex

Used for:

- Verifying project structure
- Debugging route resolution issues
- Comparing project versions
- Identifying server configuration problems

6. Reflection

AI tools significantly improved development speed by reducing repetitive coding and helping identify implementation issues. All AI-generated suggestions were reviewed, modified where necessary, manually integrated, and verified before being committed to the project.

##  Future Improvements
- Image Upload
- Payment Gateway
- Email Notifications
- Admin Analytics Dashboard
- Automated Testing
- Docker Support

## Author

1. Sourav(2320191)

B.Tech CSE Student at CGC College of Engineering , Landran

2. AI (as co-author)
i already mentioned 
