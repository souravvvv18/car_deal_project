# Car Dealership App

Simple Node.js, Express, and SQLite car dealership project with authentication, car inventory, and test-drive booking support.

## Features

- User registration and login with JWT authentication
- Car listing and car details endpoints
- Test-drive booking creation and admin review endpoints
- Basic vehicle CRUD endpoints backed by SQLite
- Responsive vanilla JavaScript frontend

## Project Structure

```text
car-dealership8/
	backend/
		config/
		controllers/
		database/
		middleware/
		models/
		routes/
		server.js
	frontend/
		index.html
		styles.css
		app.js
```

## Requirements

- Node.js 18 or newer
- npm

## Setup

1. Install backend dependencies.

```bash
cd backend
npm install
```

2. Review environment variables.

The project already includes [backend/.env.example](backend/.env.example). Copy it to `.env` if needed and confirm `JWT_SECRET` is set.

3. Start the backend.

```bash
npm run dev
```

The API runs on `http://localhost:5000` by default.

4. Open the frontend.

Open [frontend/index.html](frontend/index.html) in a browser, or serve the `frontend` folder through any static server.

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

- Login page: `screenshots/login.png`
- Register page: `screenshots/register.png`
- Car listing: `screenshots/car-listing.png`
- Car details: `screenshots/car-details.png`
- Booking form: `screenshots/booking.png`
- Admin dashboard: `screenshots/dashboard.png`

## Notes

- Authentication uses JWT bearer tokens in the `Authorization` header.
- SQLite data is stored in `backend/database/car_deal.db` by default.
- The frontend currently expects the backend to run at `http://localhost:5000`.
