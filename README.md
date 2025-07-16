# Task Management API  
Backend Challenge (MVP)
[![View on GitHub](https://img.shields.io/badge/GitHub-View%20Repo-blue?logo=github)](https://github.com/itsadrianapaiva/taskManagementAPI.git)
[Complete Technical Documentation (PDF)](./docs/technical-documentation.pdf)


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

## Running on Gitpod

> This project was developed and tested using **Gitpod** with Docker support.  
> No local installation required.

### Quick Start on Gitpod:
1. **Open the repository directly in Gitpod**:  
   [Open in Gitpod](https://gitpod.io/#git@github.com:itsadrianapaiva/taskManagementAPI.git)

2. **Start the project inside the Gitpod terminal:**
```bash
docker-compose up --build
```

3. Access the API through Gitpod's forwarded port (shown in the Gitpod interface).

4. Run tests:
```bash
npm run test
```

### Tests cover:
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
See [Kubernetes Deployment Section](./docs/k8s.md)  
All manifests provided for API, MySQL, Redis, Worker.

## API Endpoints Summary
See [OpenAPI spec](./docs/openapi.yaml).

### Authentication
```
POST   /api/v1/auth/signup
POST   /api/v1/auth/login
GET    /api/v1/auth/profile
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
- Integrate real notification services (Email/SMS)
- Auto-generated Swagger/OpenAPI docs for developer onboarding
- Secure secrets management via Vault/Kubernetes Secrets
- CI/CD pipeline (GitHub Actions) for tests, builds, deployments
- E2E testing for queue/worker flows
- Replace the current manual input validation with a robust validation library (e.g., Zod, Yup, or Joi) to provide better schema enforcement, error messages, and maintainability.


## Documentation
- [📑 Complete Technical Documentation (PDF)](./docs/technical-documentation.pdf)
- [⚙️ Kubernetes Deployment Guide (PDF)](./docs/k8s.md)
- [📂 OpenAPI Spec (YAML)](./docs/openapi.yaml)

---
Thank you for reviewing this submission. I'm happy to clarify or walk through the solution if needed.


