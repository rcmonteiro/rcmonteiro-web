---
title: "Overview and setup monorepo with Turborepo"
date: "2024-05-14T18:50:00.000Z"
project: "Travel Booking Hub"
excerpt: "Travel Booking Hub is designed to simplify travel planning by unifying various services into a seamless platform"
tags: ["Project overview", "Monorepo", "TurboRepo"]
---

## Why monorepo?

Since this is a project to create some microservices with domain event communication, and I'am the only developer working on the back-end, front-end and IaC, it doesn't make any sense to work on several repositories.  Using turborepo will improve my productivity in this project a lot!


##  What's my goal with this project?

To learn more about how to properly make a real case scenario for using microservices

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

##  Tech Stack

- TypeScript, always o/
- Next.js for the user interface
- Node.js proxy for the API Gateway solution
- Node.js with Fastify and Zod for the back-end microservices
- Postgres to persist data on each microservice
- RabbitMQ for the event bus solution

## Day 01 - setting up turborepo

```bash
mkdir travel-booking-hub
cd travel-booking-hub
pnpm dlx create-turbo@latest ./
```
Some cleanup:
- Deleted:
  - ./packages/ui
  - ./apps

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
├── apps/ 
│ ├── web/
│ ├── event-bus/
│ ├── api-gateway/
│ ├── services/
│ │ ├── user-service/
│ │ ├── flight-service/
│ │ ├── hotel-service/
│ │ └── ...
│ └── ...
└── ...
```

### Setting up prettier

```json
# ./packages/prettier/package.json
{
  "name": "@travel-booking-hub/prettier",
  "version": "0.0.1",
  "main": "index.mjs",
  "private": true,
  "devDependencies": {
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.14"
  }
}

# ./packages/prettier/index.mjs
/** @typedef {import('prettier').Config} PrettierConfig */

/** @type {PrettierConfig} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  bracketSameLine: false,
}

export default config
```

Now on ./packages/prettier folder, just run
```bash
pnpm i
```