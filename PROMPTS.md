# PROMPTS.md

# AI Prompt History

This document contains the major prompts used during the development of the Car Dealership Management System. AI tools were used to accelerate development, generate boilerplate code, assist with debugging, improve project structure, and enhance documentation. All generated code was manually reviewed, modified where necessary, and integrated into the project.

---

## 1. Project Planning

Design a clean backend architecture for a Car Dealership Management System using Node.js, Express.js, SQLite, and JWT Authentication. Suggest an organized folder structure following good development practices.

---

## 2. Backend Boilerplate

Generate the initial Express.js backend boilerplate with proper folder structure including controllers, models, middleware, routes, database, and configuration files.

---

## 3. SQLite Integration

Replace the existing database implementation with SQLite using better-sqlite3. Configure database initialization and automatic table creation without breaking the existing project structure.

---

## 4. Authentication Module

Implement a complete authentication module including user registration, login, password hashing using bcrypt, JWT generation, protected routes, and role-based authorization.

---

## 5. Authentication Validation

Generate validation middleware for user registration and login requests with proper error handling and meaningful API responses.

---

## 6. JWT Middleware

Create reusable JWT authentication middleware that verifies bearer tokens and supports admin authorization.

---

## 7. Car CRUD

Implement complete CRUD APIs for car management including Create, Read, Update, Delete, proper validation, and SQLite database operations.

---

## 8. Search and Filter

Extend the car listing endpoint to support searching and filtering using brand, model, fuel type, transmission, price range, and manufacturing year.

---

## 9. SQLite Models

Generate SQLite model functions using prepared statements while following clean coding practices.

---

## 10. Booking Module

Implement a complete Test Drive Booking module including Booking Model, Controller, Routes, Validation Middleware, and SQLite table creation.

---

## 11. Booking APIs

Generate REST APIs for booking creation, viewing user bookings, viewing all bookings as admin, updating booking status, and booking cancellation.

---

## 12. Database Relationships

Join booking information with user and vehicle details while keeping SQLite queries optimized.

---

## 13. Vehicle Module

Generate CRUD endpoints for vehicle management while maintaining consistency with the existing backend architecture.

---

## 14. Error Handling

Review the backend and improve API error handling, status codes, JSON response format, and exception handling.

---

## 15. Route Debugging

Debug Express routing issues causing HTTP 404 responses and verify route registration order.

---

## 16. API Verification

Verify that all backend routes are properly mounted and accessible through their expected endpoints.

---

## 17. SQLite Debugging

Identify SQLite database issues related to missing tables, incorrect schema, and query execution.

---

## 18. Server Configuration

Review server configuration and identify issues preventing Express routes from loading correctly.

---

## 19. Backend Review

Review the complete backend project for missing files, incomplete implementations, and broken imports without recreating already working code.

---

## 20. Frontend Planning

Design a lightweight frontend using HTML, CSS, and Vanilla JavaScript that integrates directly with the backend REST APIs.

---

## 21. Login Page

Generate a responsive login page that communicates with the backend authentication API.

---

## 22. Registration Page

Generate a registration page supporting user account creation through the backend API.

---

## 23. Car Listing

Create a frontend page that fetches and displays available cars from the backend.

---

## 24. Car Details

Generate a detailed car information page using the selected vehicle data returned by the API.

---

## 25. Booking Form

Create a frontend booking form that submits test drive requests to the backend API.

---

## 26. Admin Dashboard

Generate a basic administrative dashboard displaying booking information and system statistics.

---

## 27. API Integration

Connect frontend pages with backend APIs using the Fetch API while implementing proper error handling.

---

## 28. Frontend Debugging

Debug frontend issues related to API communication, CORS, routing, and authentication.

---

## 29. Route Verification

Identify the exact cause of "Cannot GET /api/cars" and verify whether the issue is related to routing, middleware, server configuration, or stale processes.

---

## 30. Project Verification

Review the entire project and verify that authentication, vehicle management, booking module, frontend integration, and SQLite database are functioning correctly.

---

## 31. README Improvement

Generate a professional README including project overview, installation guide, API documentation, screenshots section, AI usage, and future improvements.

---

## 32. Git Commit Suggestions

Suggest meaningful Git commit messages that clearly describe completed development milestones and implemented features.

---

## 33. Documentation Review

Review the complete documentation to improve readability, formatting, and professionalism.

---

## 34. Final Project Review

Perform a final project review and identify any remaining improvements before submission.

---

## 35. Debugging Support

Help identify runtime issues, routing errors, missing middleware, incorrect imports, and backend configuration problems while preserving existing working functionality.

---

## AI Tools Used

- ChatGPT
- GitHub Copilot
- Cursor AI
- Claude
- Codex

These tools were used for planning, boilerplate generation, debugging, documentation, reviewing code, and improving development efficiency. All generated code was manually reviewed and integrated before being committed to the repository.