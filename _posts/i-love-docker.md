---
updatedAt: "2024-05-15T15:20:57.000Z"
title: "I Love Docker 💙"
project: "Travel Booking Hub"
excerpt: "Ah, Docker! The superhero of modern development"
tags: ["Docker", "Docker Compose", "Postgres", "RabbitMQ"]
repoUrl: "https://github.com/rcmonteiro/travel-booking-hub"
prev: "overview-and-setup-monorepo-with-turborepo"
next: "exploring-microservices-a-first-step"
---

## How Docker Makes a Developer's Life Easier

Ah, Docker! The superhero of modern development. Imagine this: with just a few lines of code, you've spun up a complete local development environment, complete with four isolated services, ready to go. Yes, you heard that right—four services, neatly packaged and running smoothly on your machine. It's like magic, but better because it's real!

Gone are the days of "But it works on my machine!" Docker ensures that your environment is consistent, no matter where you're working. Whether you're at home in your pajamas or at a bustling café, you can be sure your PostgreSQL databases and RabbitMQ broker are just a *docker-compose up -d* away.

## What Just Happened Here?

In our little docker-compose.yml file, we've set up:

- **Three PostgreSQL services**: One each for our user, hotel, and flight services. No more fumbling with different configurations or fighting with database versions.
- **RabbitMQ service**: For all your message brokering needs. Communication between services has never been so seamless.

## The Real Magic

With Docker:

- **Isolation**: Each service runs in its own container, isolated from the rest. This means no more conflicts and a cleaner development environment.
- **Consistency**: Your setup is the same, whether it's running on your laptop, your colleague's desktop, or in the cloud. Consistency is key, and Docker delivers.
- **Simplicity**: Spinning up complex environments used to be a headache. Now, it's a breeze. With a single command, everything is up and running.

## The docker-compose-yml

```
# ./docker-compose-yml
services:
  pg-user-service:
    container_name: pg-user-service
    image: bitnami/postgresql:latest
    restart: always
    ports:
      - 5431:5432
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=tbh-user-service
    volumes:
      - db-user:/data/postgres
    networks:
      - tbh-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  pg-hotel-service:
    container_name: pg-hotel-service
    image: bitnami/postgresql:latest
    restart: always
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=tbh-hotel-service
    volumes:
      - db-hotel:/data/postgres
    networks:
      - tbh-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  pg-flight-service:
    container_name: pg-flight-service
    image: bitnami/postgresql:latest
    restart: always
    ports:
      - 5433:5432
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=tbh-flight-service
    volumes:
      - db-flight:/data/postgres
    networks:
      - tbh-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  tbh-rabbitmq:
    image: rabbitmq:3-management
    container_name: tbh-rabbitmq
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: user
      RABBITMQ_DEFAULT_PASS: password
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    networks:
      - tbh-network

networks:
  tbh-network:
    driver: bridge

volumes:
  db-user:
  db-flight:
  db-hotel:
  rabbitmq_data:
```

## Explanation

This docker-compose.yml file defines a multi-service application setup using Docker Compose. The setup includes three PostgreSQL database services (one for each service: user, hotel, and flight) and a RabbitMQ service for message brokering. Here's a breakdown of each component:

**PostgreSQL Services**

- pg-user-service, pg-hotel-service, pg-flight-service:
  - container_name: Specifies the name of the container.
  - image: Uses the bitnami/postgresql:latest image for PostgreSQL.
  - restart: Always restarts the container if it stops.
  - ports: Maps the container's PostgreSQL port (5432) to a unique port on the host (5431, 5432, 5433 respectively).
  - environment: Sets environment variables for PostgreSQL configuration, including the user, password, and database name.
  - volumes: Mounts a volume for persistent storage of the PostgreSQL data.
  - networks: Connects the container to the tbh-network.
  - healthcheck: Defines a health check command to ensure PostgreSQL is ready to accept connections.

RabbitMQ Service

- tbh-rabbitmq:
  - container_name: Specifies the name of the container.
  - image: Uses the rabbitmq:3-management image, which includes the RabbitMQ management plugin.
  - restart: Always restarts the container if it stops.
  - ports: Maps the container's RabbitMQ ports (5672 for messaging, 15672 for the management UI) to the same ports on the host.
  - environment: Sets environment variables for the default RabbitMQ user and password.
  - volumes: Mounts a volume for persistent storage of RabbitMQ data.
  - networks: Connects the container to the tbh-network.

Networks

- tbh-network:
  - driver: Specifies the network driver as bridge, creating an isolated network for the containers.

Volumes

- db-user, db-flight, db-hotel, rabbitmq_data:
  - Defines named volumes for persistent storage, ensuring data is not lost when containers are stopped or removed.