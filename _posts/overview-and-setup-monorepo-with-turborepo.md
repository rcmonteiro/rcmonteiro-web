---
title: "Overview and setup monorepo with Turborepo"
project: "Travel Booking Hub"
excerpt: "Travel Booking Hub is designed to simplify travel planning by unifying various services into a seamless platform"
tags: ["TurboRepo", "Eslint", "TypeScript", "Zod"]
repoUrl: "https://github.com/rcmonteiro/travel-booking-hub"
next: "building-microservices-and-api-gateway"
---

## Why monorepo?

Since this is a project to create microservices with domain event communication, and I am the only developer working on the back-end and front-end, it doesn't make sense to work with multiple repositories. Using Turborepo will significantly improve my productivity in this project!


##  What's my goal with this project?

To learn more about properly implementing microservices in a real-case scenario.

##  Project overview

TravelBookingHub is designed to simplify travel planning by unifying various services into a seamless platform. Here’s a breakdown of the system components and their interactions:

- API Gateway:
  - Acts as the central entry point for all client requests.
  - Handles user authentication and authorization using JWT.
  - Routes requests to the appropriate microservices.
- User Service:
  - Manages user registration, authentication, and profile data.
  - Implements JWT for secure access control.
- Flight Service:
  - Manages flight search, booking, and reservation confirmations.
  - Publishes flight reservation events to the event bus.
- Hotel Service:
  - Handles hotel search, availability checks, and bookings.
  - Publishes hotel reservation events to the event bus.
- Car Rental Service:
  - Manages car rental search, bookings, and confirmations.
  - Publishes car rental reservation events to the event bus.
- Event Bus:
  - Utilizes RabbitMQ for inter-service communication.
  - Ensures real-time updates and data consistency across services.

## Domain events example

Here we can see the API Gateway sending requests to the User and Hotel Services. Both services send and consume events from RabbitMQ.

![Flowchart](/posts/travel-booking-hub.svg)


##  Tech Stack

- TypeScript, always o/
- Next.js for the user interface
- Node.js proxy for the API Gateway solution
- Node.js with Fastify and Zod for the back-end microservices
- Postgres to persist data on each microservice
- RabbitMQ for the event bus solution

## Setting up turborepo

```bash
mkdir travel-booking-hub

cd travel-booking-hub

pnpm dlx create-turbo@latest ./
```

Project structure:
```json
TravelBookingHub/
│
├── packages/ 
│ ├── eslint-config/
│ ├── typescript-config/
│ ├── prettier/
│ ├── env/
│ └── ...
│
├── web/
├── event-bus/
├── api-gateway/
├── services/
│ ├── user-service/
│ ├── flight-service/
│ ├── hotel-service/
│ └── ...
└── ...
```

### Setting up shared packages

All packages will be shared between the back-end and front-end applications. I'll use a ready-to-use ESLint configuration from Rocketseat, along with a basic setup for Prettier and TypeScript. The env package will be used to share a single .env file, validated with Zod, across all other packages in this project. To achieve this, I'll use @t3-oss/env-nextjs to export the environment variables. Check the repository for more information in /.env-sample and /packages/env/index.ts.