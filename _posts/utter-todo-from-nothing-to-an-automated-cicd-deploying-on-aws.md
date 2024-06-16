---
updatedAt: "2024-06-16T14:00:00.000Z"
title: "Utter Todo: From Nothing to an Automated CI/CD Deploying APP on AWS"
project: "Utter Todo"
excerpt: "This project uses TypeScript, React, Node, CI/CD, AWS, Docker, and Terraform to build a simple Todo App. Learn how to implement Nest.js and Next.js, test with Vitest and Playwright, and orchestrate AWS infrastructure using Terraform, all within a monorepo setup."
tags: ["Turborepo", "Nest", "Next", "Typescript", "React"]
repoUrl: "https://github.com/rcmonteiro/utter-todo"
---
Given the difficulty of finding a job, I decided to embark on a new project that we will explore here on the site. The goal is to incorporate all my learning in TypeScript, React, Node, CI/CD, AWS, Docker, Terraform, CA, SOLID, and DDD into a simple yet comprehensive project, making it easier to review each part of the code.

## Project Organization

- **Monorepo Structure**:
  - Utilize Turborepo to manage all project requirements.

- **Backend**:
  - Use Nest.js for building the server-side application.

- **Frontend**:
  - Use Next.js along with Shadcn/ui to streamline the project setup, avoiding the need to reinvent the wheel.

- **Domain Layer**:
  - Create an isolated domain layer containing entities, use cases, and interfaces for repositories and services.
  - Implement these components later in the infrastructure layers following the Dependency Inversion Principle (DIP) of SOLID.
  - Adhere to Test-Driven Development (TDD) to ensure the code is testable and secure from the outset.

- **Testing**:
  - Use Vitest and Playwright for comprehensive testing.
  - Orchestrate all tests, leveraging the benefits of a monorepo setup, both during development and in CI/CD pipelines using GitHub Actions.

- **Containerization and Deployment**:
  - Containerize the entire application with Docker.
  - Publish Docker images to Docker Hub and AWS Elastic Container Registry (ECR).
  - Deploy applications to AWS App Runner.

- **Infrastructure as Code (IaC)**:
  - Orchestrate all AWS infrastructure directly from the IaC package within the monorepo.
  - Use Terraform to provision AWS resources such as ECR, App Runner, database, and Redis for cache management and rate limiting.

The choice of a simple Todo App project allows the focus to remain on the development methodology and architecture rather than the complexity of the application itself, with a significant emphasis on the CI/CD pipeline.