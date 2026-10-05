# Andrey Evtukh — Personal Portfolio

Personal portfolio and developer profile showcasing my professional experience, technical expertise, projects, and full-stack development capabilities.

The project combines a modern **Next.js / React frontend** with a **Java / Spring Boot backend**, GraphQL API, authentication, email verification, and a PostgreSQL database.

## Live Demo

**Portfolio:** https://andrey-evtukh.vercel.app/

---

## About

I am a **Senior Full-Stack Developer** with 12+ years of experience building scalable web applications and enterprise solutions.

My primary expertise includes:

* Angular and React frontend development
* TypeScript and modern JavaScript
* Java and Spring Boot backend development
* REST and GraphQL APIs
* Real-time communication
* Scalable application architecture
* Nx monorepos and modular architecture
* PostgreSQL and MongoDB
* Kafka and event-driven systems
* Docker and CI/CD

This portfolio demonstrates both my professional experience and my hands-on full-stack development skills.

---

## Features

### Portfolio

* Responsive single-page portfolio
* Professional profile and career overview
* Experience and education timeline
* Technical skills grouped by domain
* Project showcase
* Testimonials
* Contact section
* CV download

### Authentication

* User registration
* Email verification with OTP
* Login
* Password reset
* JWT-based authentication
* Protected backend operations
* Role-based authorization

### Contact Form

* Server-side validation
* GraphQL mutation
* Email notifications
* Reply-to support
* Integration with Brevo Email API

### UI / UX

* Responsive design
* Dark modern interface
* Smooth section navigation
* Scroll-based navigation state
* Animated transitions
* Accessible interactive components

---

## Tech Stack

### Frontend

* **Next.js 16**
* **React 19**
* **TypeScript 7**
* **Tailwind CSS 4**
* **Material UI**
* **Motion**
* **Redux Toolkit**
* **Apollo GraphQL**

### Backend

* **Java 21**
* **Spring Boot**
* **Spring Security**
* **Spring GraphQL**
* **JWT**
* **Gradle**

### Database & Infrastructure

* **PostgreSQL**
* **Docker**
* **Flyway**
* **Kafka**
* **MongoDB**

### APIs & Communication

* GraphQL
* REST
* Server-Sent Events (SSE)
* WebSockets
* MQTT

### Development

* Nx
* Git
* CI/CD
* Jest
* Vitest
* Swagger / OpenAPI
* Postman
* Claude AI

---

## Architecture

The project is split into a modern frontend application and a dedicated backend service.

```text
┌─────────────────────────────────────────────┐
│                Next.js / React              │
│                                             │
│  UI · MUI · Tailwind · Redux · Apollo       │
│                                             │
└──────────────────────┬──────────────────────┘
                       │
                       │ GraphQL / HTTP
                       ▼
┌─────────────────────────────────────────────┐
│              Spring Boot Backend            │
│                                             │
│  Spring GraphQL · Security · JWT · Services │
│                                             │
└───────────────┬─────────────────┬───────────┘
                │                 │
                ▼                 ▼
        ┌──────────────┐   ┌──────────────┐
        │ PostgreSQL   │   │ Brevo API    │
        │              │   │              │
        │ Users        │   │ Email        │
        │ Verification │   │ Notifications│
        └──────────────┘   └──────────────┘
```

---

## Project Structure

### Frontend

```text
src/
├── apollo/
│ 
├── app/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   └── ui/
│
├── config/
│
├── features/
│   └── auth/
│
├── sections/
│   ├── about/
│   ├── contacts/
│   ├── projects/
│   ├── resume/
│   └── skills/
│
├── hooks/
│
├── store/
│
└── types/
```

The frontend follows a feature-oriented structure with reusable components, isolated features, shared configuration, and centralized state management.

### Backend

```text
src/main/java/
└── com/portfolio/backend/
    ├── config/
    ├── controller/
    ├── dto/
    ├── entity/
    ├── exception/
    ├── repository/
    ├── security/
    └── service/
```

The backend follows a layered architecture separating API, business logic, persistence, security, and configuration concerns.

---

## Authentication Flow

Registration uses an email verification flow:

```text
Client
  │
  │ requestRegistration
  ▼
Spring Boot
  │
  ├── validate user
  ├── generate OTP
  ├── store verification code
  └── send email
          │
          ▼
      Brevo API
          │
          ▼
       User Email

Client
  │
  │ confirmRegistration
  ▼
Spring Boot
  │
  ├── validate OTP
  ├── activate user
  └── generate JWT
          │
          ▼
       Client
```

Verification codes are time-limited and are validated on the backend.

---

## GraphQL API

The backend exposes a GraphQL API under:

```text
/api/v1/graphql
```

GraphiQL is available during development at:

```text
/api/v1/graphiql
```

Authentication-related operations include:

```text
login
requestRegistration
confirmRegistration
requestPasswordReset
resetPassword
emailExists
```

The contact form also communicates with the backend through GraphQL.

---

## Email Delivery

Email delivery uses the **Brevo HTTP API** rather than SMTP.

This allows the backend to send email through HTTPS without relying on outbound SMTP ports.

The backend supports:

* Registration verification codes
* Contact form notifications
* Reply-to user email addresses
* Configurable sender information

Required environment variable:

```text
BREVO_API_KEY
```

---

## Environment Variables

### Frontend

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8082
```

Use environment-specific values for local development and production.

### Backend

Example:

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/portfolio_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password

JWT_SECRET=your_secret

BREVO_API_KEY=your_api_key

MAIL_FROM=your_email@example.com
MAIL_FROM_NAME=Andrey Evtukh
```

Never commit secrets, API keys, passwords, or JWT signing keys to the repository.

---

## Local Development

### Prerequisites

Make sure the following are installed:

* Node.js
* Yarn
* Java 21
* Gradle
* Docker
* PostgreSQL

### Frontend

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

The frontend is configured to run on:

```text
http://localhost:4302
```

### Backend

Navigate to the backend project:

```bash
cd backend
```

Run the application:

```bash
./gradlew bootRun
```

On Windows:

```bash
gradlew.bat bootRun
```

The backend runs on:

```text
http://localhost:8082
```

---

## Database

The application uses PostgreSQL.

Development database:

```text
portfolio_db
```

Database schema changes are managed with **Flyway**.

JPA schema validation is enabled so that the application validates the database structure instead of automatically modifying it.

---

## Docker

Infrastructure services can be started with Docker.

Example PostgreSQL container:

```text
portfolio-postgres
```

The project can also use Kafka and MongoDB for event-driven and statistics-related functionality.

---

## Testing

The project uses modern JavaScript/TypeScript testing tools on the frontend and Spring testing facilities on the backend.

Frontend testing:

```bash
yarn test
```

Backend tests:

```bash
./gradlew test
```

On Windows:

```bash
gradlew.bat test
```

---

## Code Quality

The project follows several engineering principles:

* Strong TypeScript typing
* Component reusability
* Separation of concerns
* Feature-oriented architecture
* Centralized application state
* API contract separation
* Backend layered architecture
* Secure authentication
* Environment-based configuration
* Automated testing
* Code review practices
* CI/CD-oriented development

---

## Projects

The portfolio includes several representative projects.

### Hotel Booking

Full-stack hotel booking application demonstrating:

* Java 21
* Spring Boot
* Spring Security
* PostgreSQL
* Flyway
* Kafka
* MongoDB
* Docker
* REST
* GraphQL
* Swagger / OpenAPI
* Angular
* Material UI
* AG Grid

The project includes authentication, hotel and room management, booking functionality, and an event-driven statistics service.

### Arlo Professional

Enterprise web application development involving:

* Angular
* TypeScript
* Material UI
* REST / GraphQL
* MQTT
* Server-Sent Events
* DASH
* HLS
* SIP
* FlowPlayer
* Amplitude
* LaunchDarkly
* Firebase

Responsibilities included frontend development, streaming solutions, real-time communication, architecture improvements, code reviews, production troubleshooting, and CI/CD improvements.

### Verisure

Full-stack development involving:

* Angular
* TypeScript
* Ionic
* GraphQL
* REST
* Java
* Spring Boot
* Tailwind CSS

### Enterprise Applications

Experience with large-scale enterprise applications, including:

* AngularJS to modern Angular migrations
* Angular / React hybrid applications
* Nx monorepos
* Microfrontend architecture
* Shared UI libraries
* BFF architecture
* Java Servlets / JSP
* Performance optimization
* CI/CD

---

## Deployment

The frontend is deployed using **Vercel**.

The backend can be deployed as an independent Spring Boot service with PostgreSQL and external email infrastructure.

Production configuration is provided through environment variables rather than committed configuration files.

---

## Security

Security-related configuration follows these principles:

* Passwords are stored using secure password hashing
* Authentication is based on JWT
* Verification codes are time-limited
* Secrets are provided through environment variables
* Database credentials are not committed to Git
* API keys are not stored in source code
* Backend validation is performed independently of frontend validation

---

## Author

**Andrey Evtukh**

Senior Full-Stack Developer

Specializing in:

```text
Angular · React · TypeScript · Java · Spring Boot
GraphQL · REST · PostgreSQL · Kafka · Docker
Nx · Tailwind CSS · MUI · Cloud / CI/CD
```

**Location:** Bialystok, Poland
**Open to:** Remote opportunities and relocation

### Links

* LinkedIn: https://linkedin.com/in/andrey-evtukh/
* GitHub: https://github.com/AndreyEvtukh
* Portfolio: https://andrey-evtukh.vercel.app/

---

## License

This project is a personal portfolio application.

The source code is provided for demonstration and educational purposes. Content, personal information, branding, and project-specific materials remain the property of their respective owners.
