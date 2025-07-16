# Task Management API  
Backend Challenge (MVP)

## Overview  
This project is a secure, role-based task management API designed for a healthcare-like environment where managers oversee technicians' work. It demonstrates strong backend fundamentals, focusing on security, clean architecture, database integrity, and asynchronous processing through message queues.

## Key Features  
- **Role-Based Access Control** (Technician vs. Manager)
- **JWT Authentication with Secure HTTP-Only Cookies**
- **MySQL (Manual SQL, No ORM)**
- **Redis + BullMQ for Notifications (Async Job Queue)**
- **Rate Limiting and Manual Input Validation**
- **Kubernetes-Ready**
- **Unit Tests (Jest + Supertest)**

## Tech Stack  
- Node.js
- Express
- MySQL
- Redis
- BullMQ
- Docker & Docker Compose
- Kubernetes (Deployment Manifests Provided)
- Jest + Supertest

## Project Structure (MVP)
```
src/
├── config/            # Configuration files (env, db)
├── controllers/       # HTTP controllers
├── db/                # DB connection, migrations, seed
├── middlewares/       # Auth, error handling, rate limit
├── queues/            # BullMQ setup
├── routes/            # Route definitions
├── services/          # Business logic (DB queries)
├── utils/             # Input validation utilities
├── workers/           # Notification worker
├── app.js             # Express app setup
├── server.js          # App entrypoint
tests/                 # Integration tests
k8s/                   # Kubernetes manifests
```

## 🖥️ Running on Gitpod

This project was developed and tested using **Gitpod** with Docker support.

### Steps to Run:

1️. Open the repository in Gitpod:  <https://gitpod.io/#git@github.com:itsadrianapaiva/taskManagementAPI.git>
2️. Inside Gitpod terminal:  
```bash
docker-compose up --build
3.Acess the API:
http://(Gitpod will provide a forwarded port URL in the interface.)
4. Running Tests:
```bash
npm run test
```
Tests cover:
- Authentication (signup/login)
- Role-based access
- Task lifecycle (create, update, delete)

## Security Measures
- Manual input validation for all user input
- Rate limiting
- Secure HTTP-only cookies
- Separation of concerns (clear layers)
- Database constraints for integrity

## Running Locally (Docker Compose)
```bash
docker-compose up --build
```
API runs at: [http://localhost:3001](http://localhost:3001)  
MySQL, Redis are networked internally via Docker Compose.

## Environment Variables
Manage `.env` file or ConfigMap/Secrets in Kubernetes for:
```
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
REDIS_HOST=
REDIS_PORT=
```

## Kubernetes Deployment (Prepared)
See [Kubernetes Deployment Section](#-kubernetes-deployment-documentation-only)  
All manifests provided for API, MySQL, Redis, Worker.

## API Endpoints Summary

### Authentication
```
POST   /api/v1/auth/signup
POST   /api/v1/auth/login
GET    /api/v1/auth/me
```

### Tasks
```
POST   /api/v1/tasks           (Technician only)
GET    /api/v1/tasks            (Manager: all, Technician: own)
PATCH  /api/v1/tasks/:id        (Technician only)
DELETE /api/v1/tasks/:id        (Manager only)
```

## Development Practices Followed
- Planning-first approach  
- Guardrails: small functions, low complexity, DRY principles  
- MVP scope delivered with clean separation of concerns  
- Security and quality prioritized at each step  
- Kubernetes deployment prepared for real-world expectations  

## Possible Improvements (If More Time)
- Email/SMS integration for real notifications
- Swagger/OpenAPI documentation
- Production-grade secrets management
- CI/CD pipeline for automated tests + deploy

